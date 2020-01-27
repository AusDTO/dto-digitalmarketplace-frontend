import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';

import { required, validEmail, governmentEmail } from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import Textfield     from '../../../../shared/form/Textfield';
import formProps     from '../../../../shared/reduxModules/formPropsSelector';
import RadioList     from '../../../../shared/form/RadioList';

import PageAlert     from '@gov.au/page-alerts';

import api        from '../../../../shared/reduxModules/api';

import './SignupForm.css'

class SignupForm extends BaseForm {

  static propTypes = {
    action: PropTypes.string,
    csrf_token: PropTypes.string,
    form: PropTypes.object.isRequired,
    errors: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      signupSuccess: null,
      signupMessage: null,
      emailValidators: {
        required, validEmail
      },
      emailErrorMessages: {
        required: 'Email is required',
        validEmail: 'A validly formatted email is required',
        governmentEmail: 'Email should have a government domain'
      },
      isBuyer: this.props.signupForm.user_type === 'buyer'
    }
    this.statusCheck = this.statusCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.form.valid) {
      if (!nextProps.form.valid) {
        this.setState({
          signupSuccess: null,
          signupMessage: null
        })
      }
    }

    if (this.props.signupForm.user_type !== nextProps.signupForm.user_type) {
      if (nextProps.signupForm.user_type === 'seller') {
        this.setState({
          emailValidators: {
            required, validEmail
          },
          emailErrorMessages: {
            required: 'Email is required',
            validEmail: 'A validly formatted email is required'
          },
          isBuyer: false
        })
      }

      if (nextProps.signupForm.user_type === 'buyer') {
        this.setState({
          emailValidators: {
            required, validEmail, governmentEmail
          },
          emailErrorMessages: {
            required: 'Email is required',
            validEmail: 'A validly formatted email is required',
            governmentEmail: 'Email should have a government domain'
          },
          isBuyer: true
        })
      }
    }
  }

  handleError({status}) {
    switch (status) {
      case 200:
        return {signupSuccess: true, signupMessage: 'success'};
        break;

      case 409:
        return {
          signupSuccess: false, signupMessage: <li>
              <p>
                An account with this email domain already exists. Someone in your team may have
                already created an account with the Marketplace.
              </p>
            </li>
        };
        break;

      default:
        return {
          signupSuccess: false, signupMessage: <li>
              <p>
                The Digital Marketplace encountered an error trying to send your signup email.
                Please try again later
                or <a href='/contact-us' target="_blank" rel="noopener noreferrer"> contact
                us </a> for assistance.
              </p>
            </li>
        };
        break;
    }
  }

  statusCheck(response) {
    window.scrollTo(0, 0)
    this.setState(this.handleError(response))
  }

  handleSubmit(model) {
    this.setState({signupSuccess: null, signupMessage: null})
    return api('/api/signup', {
      method: 'POST',
      body: JSON.stringify(model),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(this.statusCheck)
      .catch((error) => {
        this.setState({signupSuccess: false, signupMessage: error})
      })
  }

  handleSubmitFailed() {
    this.setState({
      signupSuccess: null,
      signupMessage: null
    })
  }

  render() {
    const {
      csrf_token,
      model,
      form,
      formErrors,
      children,
      signupForm,
      buyer_url,
      seller_url,
      onSubmit,
      onSubmitFailed,
      submitClicked
    } = this.props;
    let valid = form.valid;
    let action = isBuyer
      ? buyer_url
      : seller_url;
    let {
      signupSuccess,
      signupMessage,
      isBuyer,
      emailValidators,
      emailErrorMessages
    } = this.state;
    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }
    return (
      <div>
        {signupSuccess && <div>
          {signupMessage && <PageAlert as='success'>
            <h4 className="au-display-sm">Signup email sent</h4>
          </PageAlert>
        }
          <article role="main">
            <header className="page-heading page-heading-without-breadcrumb">
              <h1 className="au-display-xl">
                Thanks for requesting access to the Digital Marketplace.
              </h1>
            </header>
            <p>
              An email has been sent
              to <strong>{signupForm.email_address}</strong> with next steps.
            </p>
            <p>
              If you don’t receive the email within the next 5 minutes or so, check to see if
              it’s been classified as spam or
              <a href='/contact-us' target="_blank" rel="noopener noreferrer"> contact us </a> for assistance.
            </p>
          </article>
        </div>
        }
        {!signupSuccess &&
          <Layout>
            <header>
              <h1 className="au-display-xl">Let’s get started</h1>
            </header>
          <article role="main">

            {(signupMessage && valid &&
              <PageAlert as='error'>
                <h4 className="au-display-sm">Signup invite email was not sent</h4>
                <ul>
                  {signupMessage}
                </ul>
              </PageAlert>
            )}
            <ErrorBox submitClicked={submitClicked} model={model} setFocus={setFocus}/>
            <Form
              model={model}
              action={action}
              method="post"
              id="signup"
              onSubmit={(model) => this.handleSubmit(model)}
              onSubmitFailed={onSubmitFailed}>
              {csrf_token && (<input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>)}

              <div styleName="user-type">
                <RadioList
                  model={`${model}.user_type`}
                  name="user_type"
                  id="user_type"
                  label="Have you got digital expertise to sell to government? Or do you want to buy digital products and services on behalf of your government office? Choose the option that matches your situation."
                  options={[
                  {
                    value: 'buyer',
                    label: (
                      <span>Buyer<p>
                          I want to buy on behalf of<br/>government.</p>
                      </span>
                    )
                  }, {
                    value: 'seller',
                    label: (
                      <span>Seller<p>
                          I want to sell digital products or<br/>services.</p>
                      </span>
                    )
                  }
                ]}
                  validators={{
                  required
                }}
                  messages={{
                  required: 'You must select a user type'
                }}/>
              </div>

              Now enter your name and your work email address.

              <Textfield
                model={`${model}.name`}
                name="name"
                id="name"
                htmlFor="name"
                label="Full name"
                validators={{
                required
              }}
                messages={{
                required: 'Name is required'
              }}/>

              <Textfield
                model={`${model}.email_address`}
                name="email_address"
                id="email_address"
                type="email"
                htmlFor="email_address"
                label={isBuyer
                ? (
                  <span>Email address ending in
                    <b>.gov.au.</b>
                  </span>
                )
                : "Email address"}
                description={isBuyer
                ? (
                    <span>If your email is different, request your account
                  from <a href="mailto:marketplace@digital.gov.au">marketplace@digital.gov.au</a>.</span>
                )
                : (<br/>)}
                validators={emailValidators}
                messages={emailErrorMessages} />
              {isBuyer && (
                <div styleName="employment-status">
                  <RadioList
                    model={`${model}.employment_status`}
                    name="employment_status"
                    id="employment_status"
                    label="To create a buyer account you need to be a government employee or be authorised by a government employee. Choose the option below that matches your situation."
                    options={[
                    {
                      value: 'employee',
                      label: 'I am an employee under the Commonwealth Public Service Act (1999) or under equivalent state or territory legislation and need access to the Digital Marketplace to perform my role.'
                    }, {
                      value: 'contractor',
                      label: 'I am a contractor working in local, state or federal government.'
                    }
                  ]}
                    validators={{
                    required
                  }}
                    messages={{
                    required: 'You must specify your employment status.'
                  }}/>
                </div>
              )}

              {children}
              <p>
                <small>
                  By creating an account you confirm your acceptance of our
                  <a href="/terms-of-use" target="_blank" rel="noopener noreferrer"> Terms of Use</a>.
                </small>
              </p>
              <input type="submit" value='Create your account'/>

            </Form>
          </article>
        </Layout>
}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...formProps(state, 'signupForm')
  }
}

export {Textfield, mapStateToProps, SignupForm as Form}

export default connect(mapStateToProps)(SignupForm);
