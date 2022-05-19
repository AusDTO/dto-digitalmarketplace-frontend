import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';
import isNumber from 'lodash/isNumber';

import { required, validEmail, validPhoneNumber } from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import Textfield     from '../../../../shared/form/Textfield';
import formProps     from '../../../../shared/reduxModules/formPropsSelector';
import StepNav       from '../StepNav';
import ValidationSummary from '../ValidationSummary';

import '../SellerRegistration.css'

class YourInfoForm extends BaseForm {

  static propTypes = {
    action: PropTypes.string,
    csrf_token: PropTypes.string,
    form: PropTypes.object.isRequired,
    supplierCode: PropTypes.number
  }

  render() {
    const {
      action,
      csrf_token,
      model,
      supplierCode,
      userName,
      userEmail,
      form,
      buttonText,
      children,
      onSubmit,
      onSubmitFailed,
      nextRoute,
      submitClicked,
      applicationErrors,
      type
    } = this.props;
    let title = 'Contact details';
    if (isNumber(supplierCode)) {
        title = 'Check your contact details'
    }
    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    return (
      <Layout>
        <header>
          <ValidationSummary form={form} applicationErrors={applicationErrors} filterFunc={(ae) => ae.step === 'contacts' && type === 'edit'} />
          <h1 className="au-display-xl" styleName="content-heading" tabIndex="-1">{title}</h1>
        </header>
        <article role="main">
          <ErrorBox submitClicked={submitClicked} model={model} setFocus={setFocus}/>
          <div className="calloutMistake">
            <b> Avoid common mistakes </b>
            <ul className="mistake-list">
              <li><b>Contact names</b> - use full names.</li>
              <li><b>Email and phone numbers</b> - Check the format and details are correct.</li>
            </ul>
          </div>

          <Form model={model}
            action={action}
            method="post"
            id="yourinfo"
            component={SubmitForm}
            valid={form.valid}
            onCustomSubmit={onSubmit}
            onSubmitFailed={onSubmitFailed}
          >
            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}
              {type === 'new' && (
                <React.Fragment>
                  <h2>Authorised representative</h2>

                  <Textfield
                      model={`${model}.representative`}
                      name="representative"
                      id="representative"
                      htmlFor="representative"
                      label="Name"
                      description="This is the person authorised to enter into contracts on behalf of the business."
                      validators={{ required }}
                      messages={{
                          required: 'Authorised representative is required',
                      }}
                      disabled
                  />

                  <Textfield
                      model={`${model}.email`}
                      name="email"
                      id="email"
                      htmlFor="email"
                      label="Email"
                      validators={{ required, validEmail }}
                      messages={{
                          required: 'Authorised representative\'s email is required',
                          validEmail: 'Authorised representative\'s email must be a valid email address',
                      }}
                      disabled
                  />

                  <Textfield
                      model={`${model}.phone`}
                      name="phone"
                      id="phone"
                      htmlFor="phone"
                      label="Phone"
                      description="Please include the area code for landlines."
                      validators={{ required, validPhoneNumber }}
                      messages={{
                          required: 'Authorised representative\'s phone number is required',
                          validPhoneNumber: 'Authorised representative\'s phone number must be a valid phone number',
                      }}
                      disabled
                  />
                </React.Fragment>
              )}
              <h2>Business contact</h2>

              <Textfield
                  model={`${model}.contact_name`}
                  name="contact_name"
                  id="contact_name"
                  htmlFor="contact_name"
                  label="Name"
                  description="The contact listed on your seller profile page and the person who receives new opportunities by email."
                  validators={{ required }}
                  messages={{
                      required: 'Business contact is required',
                  }}
                  default={userName}
                  disabled
              />

              <Textfield
                  model={`${model}.contact_email`}
                  name="contact_email"
                  id="contact_email"
                  htmlFor="contact_email"
                  label="Email"
                  validators={{ required, validEmail }}
                  messages={{
                      required: 'Business contact email is required',
                      validEmail: 'Business contact email must be a valid email address',
                  }}
                  default={userEmail}
                  disabled
              />

              <Textfield
                  model={`${model}.contact_phone`}
                  name="contact_phone"
                  id="contact_phone"
                  htmlFor="contact_phone"
                  label="Phone"
                  description="Please include the area code for landlines."
                  validators={{ required, validPhoneNumber }}
                  messages={{
                      required: 'Business contact phone is required',
                      validPhoneNumber: 'Business contact phone number must be a valid phone number',
                  }}
                  disabled
              />

            {children}

            <StepNav buttonText={buttonText} to={nextRoute}/>
          </Form>
        </article>
      </Layout>
    )
  }
}

YourInfoForm.defaultProps = {
  buttonText: 'Save and continue',
  title: 'Add your contact details'
}

const mapStateToProps = (state) => {
  return {
      userName: state.form_options.user_name,
      userEmail: state.form_options.user_email,
      supplierCode: state.application && state.application.supplier_code,
    ...formProps(state, 'yourInfoForm'),
    applicationErrors: state.application_errors
  }
}

export {
  Textfield,
  mapStateToProps,
  YourInfoForm as Form
}

export default connect(mapStateToProps)(YourInfoForm);
