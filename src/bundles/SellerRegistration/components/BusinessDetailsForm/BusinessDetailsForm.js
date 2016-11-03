import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, actions } from 'react-redux-form';

import { required } from '../../../../validators';

import Layout from '../../../../shared/Layout';

import ErrorBox      from '../../../../shared/form/ErrorBox';
import Textarea      from '../../../../shared/form/Textarea';
import Textfield     from '../../../../shared/form/Textfield';


class BusinessDetailsForm extends React.Component {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired,
    returnLink: React.PropTypes.string
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
    const { action, csrf_token, model, returnLink, mode } = this.props;
    return (
      <Layout>
        <header>
          <h1>Company details</h1>
        </header>
        <article role="main" className="content-main">
          <ErrorBox focusOnMount={true} model={model}/>
          {/*FIXME: this form exists purely to steal its submit method.*/}
          <form ref="submittable" tabIndex="-1" style={{ display: "none" }} />
          <Form model={model}
            action={action}
            method="post"
            id="BusinessDetails__create"
            ref={this.attachNode.bind(this)}
          >
            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}


            <Textarea
              model={`${model}.summary`}
              name="summary"
              id="summary"
              controlProps={{ limit: 50 }}
              label="Company summary"
              description="This will be displayed in search results"
              messages={{
              required: 'You must provide a seller summary'
            }}
              validators={{ required }}
            />

            <Textfield
                model={`${model}.website`}
                name="website"
                id="website"
                htmlFor="website"
                label="Website URL"
                messages={{
                    required: 'You must provide a website'
                }}
            />

            <Textfield
                model={`${model}.linkedin`}
                name="linkedin"
                id="linkedin"
                htmlFor="linkedin"
                label="LinkedIn URL"
                messages={{
                    required: 'You must provide a LinkedIn'
                }}
            />

            <fieldset>
              <legend>Company address</legend>
              <Textfield
                  model={`${model}.address.addressLine`}
                  name="address.addressLine"
                  id="addressLine"
                  htmlFor="addressLine"
                  label="Address"
                  messages={{
                      required: 'You must provide a LinkedIn'
                  }}
              />

              <Textfield
                  model={`${model}.address.suburb`}
                  name="address.suburb"
                  id="suburb"
                  htmlFor="suburb"
                  label="Suburb"
                  messages={{
                      required: 'You must provide a LinkedIn'
                  }}
              />
              <Textfield
                  model={`${model}.address.state`}
                  name="address.state"
                  id="state"
                  htmlFor="state"
                  label="State"
                  messages={{
                      required: 'You must provide a LinkedIn'
                  }}
              />
              <Textfield
                  model={`${model}.address.postalCode`}
                  name="address.postalCode"
                  id="postalCode"
                  htmlFor="postalCode"
                  label="Postcode"
                  messages={{
                      required: 'You must provide a LinkedIn'
                  }}
              />
            </fieldset>
            <input type="submit" value={mode === 'add' ? 'Next' : 'Save and return'} role="button" onClick={this.handleClick.bind(this)} />
          </Form>
          {returnLink && <a href={returnLink}>Return without saving</a>}
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const form = state.forms.businessDetailsForm.$form;
  return {
    model: 'businessDetailsForm',
    formErrors: state.form_options && state.form_options.errors,
    form,
    returnLink: state.businessDetailsForm && state.businessDetailsForm.returnLink,
    mode: state.form_options.mode || 'add',
    ...state.form_options
  }
}

export {
  Textfield,
  mapStateToProps,
  BusinessDetailsForm as Form
}

export default connect(mapStateToProps)(BusinessDetailsForm);
