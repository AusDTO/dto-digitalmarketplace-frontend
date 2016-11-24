import React from 'react';
import { connect } from 'react-redux';
import { Form, actions } from 'react-redux-form';

import 'whatwg-fetch';

//import { required } from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import StatefulError from '../../../../shared/form/StatefulError';

import formProps     from '../../../../shared/reduxModules/formPropsSelector';

class DocumentsForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    model: React.PropTypes.string.isRequired
  }

  state = {
    errors: {}
  }

  files = [
    { 'label': 'Finanical Statement', 'id': 'financial' },
    { 'label': 'Public Liability Insurance', 'id': 'liability' },
    { 'label': 'Workers Compensation Insurance', 'id': 'workers' },
    { 'label': 'Signed copy of Deed of Standing Offer', 'id': 'deed' },
  ]

  onUpload(ref, e) {
    e.preventDefault();
    const { dispatch, model, action, csrf_token } = this.props;
    const file = this.refs[ref].files[0];

    this.setState({
      [ref]: true,
      errors: Object.assign({}, this.state.errors, {[ref]: void 0})
    })

    dispatch(actions.remove(`${model}.documents.${ref}`))

    let data = new FormData()
    data.append(ref, file)
    fetch(`${action}/${ref}`, {
      method: 'POST',
      body: data,
      credentials: 'same-origin',
      headers: {
        'X-CSRFToken': csrf_token
      }
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    })
    .then(r => r.text())
    .then((filename) => {
      this.setState({
        [ref]: void 0
      });
      dispatch(actions.change(`${model}.documents.${ref}`, filename))
    })
    .catch((error) => {
      this.setState({
        [ref]: void 0,
        errors: {[ref]: true}})
    });
  }

  onReset(ref, e) {
    e.preventDefault();
    const { dispatch, model } = this.props;
    this.refs[ref].value = '';
    dispatch(actions.change(`${model}.${ref}`, ''))
    this.setState({
      [ref]: void 0
    })
  }

  render() {
    const { action, csrf_token, model, mode, form, documentsForm, serverRender, onSubmit, pathname } = this.props;
    return (
      <Layout>
        <header>
          <h1>Documents</h1>
        </header>
        <article role="main">
          <ErrorBox focusOnMount={true} model={model}/>

          <StatefulError
            model={`${model}.documents`}
            id="documents"
            messages={{
              documents: 'Please upload all documents.'
            }}
          />
          <Form model={model}
            action={action}
            method="post"
            id="yourinfo"
            component={SubmitForm}
            valid={form.valid}
            onCustomSubmit={onSubmit}
            validators={{
              documents: (documents) => Object.keys(documents).length === 4
            }}
          >
            {
              csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}

            {this.files.map((file, i) => {
              const key = file.id;
              return (
                <div key={key} className="callout">
                  <label htmlFor={key}>{file.label}</label>
                  <div>
                    <p>
                      <input type="file" id={key} name={key} ref={key} />
                    </p>
                    <div>
                      {this.state[key] && 'Uploading...'}
                      {this.state.errors[key] && 'There was an error uploading the file'}
                      {documentsForm.documents[key] && <p><a href={`${pathname.slice(1)}/${documentsForm.documents[key]}`} rel="external">{file.label}</a></p>}
                    </div>
                  </div>
                  <div className="actions">
                    <button type="submit" onClick={this.onUpload.bind(this, key)}>Upload</button>
                    {(documentsForm.documents[key] || serverRender) && <button type="reset" onClick={this.onReset.bind(this, key)}>Reset</button>}
                  </div>
                </div>
              )
            })}

            <input type="submit" value={mode === 'edit' ? 'Save & Continue' : 'Continue'} role="button" />
          </Form>
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...formProps(state, 'documentsForm')
  }
}

export {
  mapStateToProps,
  DocumentsForm as Form
}

export default connect(mapStateToProps)(DocumentsForm);
