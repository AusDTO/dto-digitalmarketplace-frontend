/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import PageAlert from '@gov.au/page-alerts'
import DocumentTitle from 'react-document-title'

import { required, validEmail, governmentEmail } from '../../components/validators'
import Layout from '../../components/shared/Layout'
import ErrorBox from '../../components/shared/form/ErrorBox'
import Textfield from '../../components/shared/form/Textfield'
import RadioList from '../../components/shared/form/RadioList'
import RadioListBox from '../../components/shared/form/RadioListBox/RadioListBox'
import LoadingButton from '../../components/LoadingButton/LoadingButton'

const SignupForm = props => {
  const {
    csrf_token,
    model,
    children,
    signupForm,
    signupSuccess,
    currentlySending,
    isBuyer,
    emailValidators,
    emailErrorMessages,
    submitClicked,
    onSubmitClicked,
    onSubmitFailed,
    handleSubmit
  } = props
  const employmentStatus = signupForm.employment_status

  let hasFocused = false
  const setFocus = e => {
    if (!hasFocused) {
      hasFocused = true
      e.focus()
    }
  }

  return (
    <div className="row">
      <DocumentTitle title="Signup - Digital Marketplace">
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          <div>
            {signupSuccess &&
              <div>
                <PageAlert as="success">
                  <h4>Signup email sent</h4>
                </PageAlert>
                <article role="main">
                  <header className="page-heading page-heading-without-breadcrumb">
                    <h1>Thanks for requesting access to the Digital Marketplace.</h1>
                  </header>
                  {isBuyer && signupForm.employment_status === 'contractor'
                    ? <div>
                        <p>
                          An email has been sent to your manager at <strong>{signupForm.line_manager_email}</strong>{' '}
                          with next steps.
                        </p>
                        <p>
                          If they don’t receive the email within the next 5 minutes or so, check to see if it’s been
                          classified as spam or
                          <a href="/contact-us" target="_blank" rel="external">
                            {' '}contact us{' '}
                          </a>{' '}
                          for assistance.
                        </p>
                      </div>
                    : <div>
                        <p>
                          An email has been sent to <strong>{signupForm.email_address}</strong> with next steps.
                        </p>
                        <p>
                          If you don’t receive the email within the next 5 minutes or so, check to see if it’s been
                          classified as spam or
                          <a href="/contact-us" target="_blank" rel="external">
                            {' '}contact us{' '}
                          </a>{' '}
                          for assistance.
                        </p>
                      </div>}
                </article>
              </div>}
            {!signupSuccess &&
              <Layout>
                <header>
                  <h1>Let’s get started</h1>
                </header>
                <article role="main">
                  <ErrorBox
                    title="There was a problem with signup"
                    model={model}
                    submitClicked={submitClicked}
                    setFocus={setFocus}
                  />
                  <Form
                    model={model}
                    method="post"
                    id="signup"
                    onSubmit={data => handleSubmit(data)}
                    onSubmitFailed={onSubmitFailed}
                  >
                    {csrf_token && <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />}
                    <div className="user-type">
                      <RadioListBox
                        model={`${model}.user_type`}
                        name="user_type"
                        id="user_type"
                        label="Choose the option that matches your situation."
                        options={[
                          {
                            value: 'buyer',
                            label: (
                              <span>
                                <span>Buyer</span>
                                <p>I want to buy on behalf of</p>
                                <p>government.</p>
                              </span>
                            )
                          },
                          {
                            value: 'seller',
                            label: (
                              <span>
                                <span>Seller</span>
                                <p>I want to sell digital products or</p>
                                <p>services.</p>
                              </span>
                            )
                          }
                        ]}
                        validators={{
                          required
                        }}
                        messages={{
                          required: 'You must select a user type'
                        }}
                      />
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
                        required: 'Your name is required'
                      }}
                    />
                    <Textfield
                      model={`${model}.email_address`}
                      name="email_address"
                      id="email_address"
                      type="email"
                      htmlFor="email_address"
                      label={
                        isBuyer
                          ? <span>
                              Email address ending in
                              <b>.gov.au.</b>
                            </span>
                          : 'Email address'
                      }
                      description={
                        isBuyer
                          ? <span>
                              If your email is different, request your account from{' '}
                              <a href="mailto:marketplace@digital.gov.au">marketplace@digital.gov.au</a>.
                            </span>
                          : ''
                      }
                      validators={emailValidators}
                      messages={emailErrorMessages}
                    />
                    {isBuyer &&
                      <div className="employment-status">
                        <RadioList
                          model={`${model}.employment_status`}
                          name="employment_status"
                          id="employment_status"
                          label="To create a buyer account you need to be a government employee or be authorised by a government employee. Choose the option below that matches your situation."
                          options={[
                            {
                              value: 'employee',
                              label:
                                'I am an employee under the Commonwealth Public Service Act (1999) or under equivalent state or territory legislation and need access to the Digital Marketplace to perform my role.'
                            },
                            {
                              value: 'contractor',
                              label: 'I am a contractor working in local, state or federal government.'
                            }
                          ]}
                          validators={{
                            required
                          }}
                          messages={{
                            required: 'You must specify your employment status.'
                          }}
                        />
                      </div>}
                    {employmentStatus &&
                      employmentStatus === 'contractor' &&
                      isBuyer &&
                      <div>
                        <p>To create your account we will also need approval from a line manager who:</p>
                        <ul>
                          <li>
                            Is an employee under the Commonwealth Public Service Act (1999) or under equivalent State or
                            Territory legislation, and
                          </li>
                          <li>is satisfied you need to access the Digital Marketplace.</li>
                        </ul>
                        <Textfield
                          model={`${model}.line_manager_name`}
                          name="line_manager_name"
                          id="line_manager_name"
                          htmlFor="line_manager_name"
                          label="Your manager's full name"
                          validators={{
                            required
                          }}
                          messages={{
                            required: 'You must provide the name of your manager'
                          }}
                        />
                        <Textfield
                          model={`${model}.line_manager_email`}
                          name="line_manager_email"
                          id="line_manager_email"
                          htmlFor="line_manager_email"
                          label="Your manager's email address"
                          validators={{
                            required,
                            validEmail,
                            governmentEmail
                          }}
                          messages={{
                            required: "You must provide your manager's email address",
                            validEmail: 'A validly formatted email is required.',
                            governmentEmail: ' Email should have a government domain.'
                          }}
                        />
                        <PageAlert as="info">
                          <p>
                            Remember to let this person know we’ll be sending them an email requesting their
                            authorisation.
                          </p>
                        </PageAlert>
                      </div>}
                    {children}
                    <p>
                      <small>
                        By creating an account you confirm your acceptance of our{' '}
                        <a href="/terms-of-use" target="_blank" rel="external">
                          Terms of Use
                        </a>
                      </small>
                    </p>
                    {currentlySending
                      ? <LoadingButton />
                      : <input
                          className="uikit-btn"
                          type="submit"
                          value="Create your account"
                          onClick={onSubmitClicked}
                        />}
                  </Form>
                </article>
              </Layout>}
          </div>
        </div>
      </DocumentTitle>
    </div>
  )
}

SignupForm.propTypes = {
  csrf_token: PropTypes.string,
  model: PropTypes.string.isRequired,
  signupForm: PropTypes.object.isRequired,
  signupSuccess: PropTypes.bool,
  currentlySending: PropTypes.bool.isRequired,
  isBuyer: PropTypes.bool.isRequired,
  emailValidators: PropTypes.object.isRequired,
  emailErrorMessages: PropTypes.object.isRequired,
  submitClicked: PropTypes.bool.isRequired,
  onSubmitClicked: PropTypes.func.isRequired,
  onSubmitFailed: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

SignupForm.defaultProps = {
  csrf_token: '',
  signupSuccess: null
}

export default SignupForm
