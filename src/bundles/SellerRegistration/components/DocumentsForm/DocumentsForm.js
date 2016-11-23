import React from 'react';
import { connect } from 'react-redux';
import { Form, actions } from 'react-redux-form';

import 'whatwg-fetch';

//import { required } from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';

import formProps     from '../../../../shared/reduxModules/formPropsSelector';

class DocumentsForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    model: React.PropTypes.string.isRequired
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
      [ref]: true
    })

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
    .then(r => r.text())
    .then((filename) => {
      this.setState({
        [ref]: void 0
      });
      dispatch(actions.change(`${model}.documents.${ref}`, filename))
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
          <Form model={model}
            action={action}
            method="post"
            id="yourinfo"
            component={SubmitForm}
            valid={form.valid}
            onCustomSubmit={onSubmit}
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
