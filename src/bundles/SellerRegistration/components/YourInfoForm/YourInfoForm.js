import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, actions } from 'react-redux-form';

import { required } from '../../../../validators';

import Layout from '../../../../shared/Layout';

import ErrorBox      from '../../../../shared/form/ErrorBox';
import Textfield     from '../../../../shared/form/Textfield';


class YourInfoForm extends React.Component {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired
  }

  /**
   * We are calling this on `Will` instead of `Did` for server rendering purposes.
   * If there are formErrors available, set the appropriate errors and show them.
   * @return {void}
   */
  componentWillMount() {
    const { dispatch, formErrors, model } = this.props;

    if (!formErrors) {
      return;
    }

    let errors = {};
    Object.keys(formErrors).forEach((key) => {
      errors[key] = {
        valid: false,
        errors: formErrors[key]
      }
    });

    dispatch(actions.setFieldsErrors(model, errors))
    dispatch(actions.setSubmitFailed(model))
  }

  attachNode(node) {
    this._form = ReactDOM.findDOMNode(node);
  }

  handleClick() {
    /**
     * FIXME
     * This is a workaround to complete a normal form submit
     */
    const { form } = this.props;
    if (form.valid) {
      this._form.submit = this.refs.submittable.submit;
      this._form.submit();
    }
  }

  render() {
    const { action, csrf_token, model, form } = this.props;
    return (
      <Layout>
        <header>
          <h1>Your Information</h1>
        </header>
        <article role="main" className="content-main">
          {form.valid === false && form.submitFailed && <ErrorBox focusOnMount={true} />}
          {/*FIXME: this form exists purely to steal its submit method.*/}
          <form ref="submittable" tabIndex="-1" style={{ display: "none" }} />
          <Form model={model}
            action={action}
            method="post"
            id="yourinfo"
            ref={this.attachNode.bind(this)}
          >
            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}

            <Textfield
              model={`${model}.representative`}
              name="representative"
              id="representative"
              htmlFor="representative"
              label="Company Representative"
              validators={{ required }}
              messages={{
                required: 'Company representative is required',
              }}
            />

            <Textfield
              model={`${model}.name`}
              name="name"
              id="name"
              htmlFor="name"
              label="Company Name"
              validators={{ required }}
              messages={{
                required: 'Company name is required',
              }} />

            <Textfield
              model={`${model}.abn`}
              name="abn"
              id="abn"
              htmlFor="abn"
              label="ABN"
              validators={{ required }}
              messages={{
                required: 'ABN is required',
              }}
            />

            <Textfield
              model={`${model}.phone`}
              name="phone"
              id="phone"
              htmlFor="phone"
              label="Phone"
              validators={{ required }}
              messages={{
                required: 'Phone is required',
              }}
            />

            <Textfield
              model={`${model}.email`}
              name="email"
              id="email"
              htmlFor="email"
              label="Email"
              validators={{ required }}
              messages={{
                required: 'Email is required',
              }}
            />

            <input type="submit" value='Save & Continue' role="button" onClick={this.handleClick.bind(this)} />
          </Form>
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const form = state.form.forms.yourInfo.$form;
  return {
    model: 'form.yourInfo',
    formErrors: state.form_options && state.form_options.errors,
    form,
    ...state.form_options
  }
}

export {
  Textfield,
  mapStateToProps,
  YourInfoForm as Form
}

export default connect(mapStateToProps)(YourInfoForm);
