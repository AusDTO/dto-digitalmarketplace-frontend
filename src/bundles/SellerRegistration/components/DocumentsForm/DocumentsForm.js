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

  onUpload(id, e) {
    e.preventDefault();
    const { dispatch, model, action, csrf_token } = this.props;
    const file = this.state[id].file;

    this.setState({
      [id]: Object.assign({}, this.state[id], {'uploading': true, 'file': void 0}),
      errors: Object.assign({}, this.state.errors, {[id]: void 0})
    })

    dispatch(actions.omit(`${model}.documents`, id))

    let data = new FormData()
    data.append(id, file)
    fetch(`${action}/${id}`, {
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
      [id]: Object.assign({}, this.state[id], {'uploading': false})
      });
      dispatch(actions.change(`${model}.documents.${id}`, filename))
    })
    .catch((error) => {
      this.setState({
        [id]: void 0,
        errors: {[id]: true}})
    });
  }

  onReset(id, e) {
    e.preventDefault();
    const { dispatch, model } = this.props;
    dispatch(actions.omit(`${model}.documents`, id))
    this.setState({
      [id]: Object.assign({}, this.state[id], {'file': void 0})
    })
  }

  onChange(id, e) {
    e.preventDefault();
    this.setState({
      [id]: Object.assign({}, this.state[id], {'file': e.target.files[0]}),
      errors: {[id]: void 0}
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
              const fieldState = this.state[key] || {}
              const doc = documentsForm.documents[key]
              const errors = this.state.errors[key]
              return (
                <div key={key} className="callout">
                  <label htmlFor={key}>{file.label}</label>
                  <div>
                    <p>
                      <input type="file" id={key} name={key} accept=".pdf,.jpg,.png" onChange={this.onChange.bind(this, key)}/>
                    </p>
                    <div>
                      {fieldState.uploading && 'Uploading...'}
                      {errors && 'There was an error uploading the file'}
                      {doc && <p><a href={`${pathname.slice(1)}/${documentsForm.documents[key]}`} rel="external">{file.label}</a></p>}
                    </div>
                  </div>
                  <div className="actions">
                    {fieldState.file && <button type="submit" onClick={this.onUpload.bind(this, key)}>Upload</button>}
                    {doc && <button type="reset" onClick={this.onReset.bind(this, key)}>Remove</button>}
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
