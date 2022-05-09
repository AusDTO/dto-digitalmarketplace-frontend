/* eslint-disable camelcase */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import DocumentTitle from 'react-document-title'

import { required, validEmail } from 'shared/validators'
import { EMAIL_NOT_WHITELISTED, GENERAL_ERROR } from 'marketplace/constants/messageConstants'
import Layout from 'shared/Layout'
import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import RadioList from 'shared/form/RadioList'
import RadioListBox from 'shared/form/RadioListBox/RadioListBox'
import LoadingButton from 'shared/LoadingButton/LoadingButton'

const getErrorMessageFromServerCode = (code, abn) => {
  let message = ''

  switch (code) {
    case 403:
      message = <p>{EMAIL_NOT_WHITELISTED}</p>
      break
    case 409:
      message = (
        <React.Fragment>
          <p>There is already a seller account with the ABN {abn}. Make sure you:</p>
          <ul>
            <li>
              <a href="#abn">Check the number you entered is correct</a>
            </li>
            <li>Check if anyone in your organisation has created an account and ask them to add you as a member</li>
          </ul>
          <p>
            If you have any issues, <a href="/contact-us">contact the Marketplace</a>.
          </p>
        </React.Fragment>
      )
      break
    default:
      message = <p>{GENERAL_ERROR}</p>
      break
  }

  return message
}

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isInternational: false
    }
    this.handleInternationalChange = this.handleInternationalChange.bind(this)
  }

  handleInternationalChange(e) {
    const isIntl = e.target.value
    this.setState({
      isInternational: isIntl === 'yes'
    })
  }

  render() {
    const {
      csrf_token,
      model,
      children,
      signupForm,
      signupSuccess,
      currentlySending,
      isBuyer,
      userType,
      signupErrorCode,
      signupABN,
      emailValidators,
      emailErrorMessages,
      submitClicked,
      onSubmitClicked,
      onSubmitFailed,
      handleSubmit
    } = this.props
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
              {signupSuccess && (
                <div>
                  <AUpageAlert as="success">
                    <h4 className="au-display-sm">Signup email sent</h4>
                  </AUpageAlert>
                  <article role="main">
                    <header className="page-heading page-heading-without-breadcrumb">
                      <span />
                      <h1 className="au-display-xl">Thanks for requesting access to the Digital Marketplace.</h1>
                    </header>
                    {isBuyer && signupForm.employment_status === 'contractor' ? (
                      <div>
                        <span />
                        <p>
                          An email has been sent to your manager at <strong>{signupForm.line_manager_email}</strong>{' '}
                          with next steps.
                        </p>
                        <p>
                          If they don’t receive the email within the next 5 minutes or so, check to see if it’s been
                          classified as spam or
                          <a href="/contact-us" target="_blank" rel="noopener noreferrer">
                            {' '}
                            contact us{' '}
                          </a>{' '}
                          for assistance.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <span />
                        <p>
                          An email has been sent to <strong>{signupForm.email_address}</strong> with next steps.
                        </p>
                        <p>
                          If you don’t receive the email within the next 5 minutes or so, check to see if it’s been
                          classified as spam or
                          <a href="/contact-us" target="_blank" rel="noopener noreferrer">
                            {' '}
                            contact us{' '}
                          </a>{' '}
                          for assistance.
                        </p>
                      </div>
                    )}
                  </article>
                </div>
              )}
              {!signupSuccess && (
                <Layout>
                  <ErrorBox
                    title="There was a problem with signup"
                    model={model}
                    submitClicked={submitClicked}
                    setFocus={setFocus}
                  />
                  {signupErrorCode && (
                    <AUpageAlert as="error">
                      <h4 className="au-display-md">There was a problem with signup</h4>
                      {getErrorMessageFromServerCode(signupErrorCode, signupABN)}
                    </AUpageAlert>
                  )}
                  <header>
                    <h1 className="au-display-xl">Let’s get started</h1>
                  </header>
                  <article role="main">
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
                                  <br />
                                  <br />
                                  I want to buy on behalf of
                                  <br />
                                  government.
                                </span>
                              )
                            },
                            {
                              value: 'seller',
                              label: (
                                <span>
                                  <span>Seller</span>
                                  <br />
                                  <br />
                                  I want to sell digital products or
                                  <br />
                                  services.
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
                      {userType && (
                        <React.Fragment>
                          {userType === 'buyer' && (
                            <React.Fragment>Now enter your name and your work email address.</React.Fragment>
                          )}
                          {userType === 'seller' && (
                            <React.Fragment>
                              {/* eslint-disable-next-line react-native/no-inline-styles */}
                              <AUpageAlert as="error" style={{ marginBottom: '1.5em' }}>
                                <p>
                                  Digital Marketplace is now closed for seller sign up. You can apply on{' '}
                                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                  <a href="https://www.buyict.gov.au" rel="external" target="_blank">
                                    BuyICT
                                  </a>{' '}
                                  <strong>from 30 May</strong>.
                                </p>
                              </AUpageAlert>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}
                      {isBuyer && (
                        <React.Fragment>
                          <div>
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
                              label="Email address"
                              validators={emailValidators}
                              messages={emailErrorMessages}
                            />
                          </div>
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
                          </div>
                        </React.Fragment>
                      )}
                      {employmentStatus && employmentStatus === 'contractor' && isBuyer && (
                        <div>
                          <p>To create your account we will also need approval from a line manager who:</p>
                          <ul>
                            <li>
                              Is an employee under the Commonwealth Public Service Act (1999) or under equivalent State
                              or Territory legislation, and
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
                              validEmail
                            }}
                            messages={{
                              required: "You must provide your manager's email address",
                              validEmail: 'A validly formatted email is required.'
                            }}
                          />
                          <AUpageAlert as="info">
                            <p>
                              Remember to let this person know we’ll be sending them an email requesting their
                              authorisation.
                            </p>
                          </AUpageAlert>
                        </div>
                      )}
                      {children}
                      {userType && userType === 'buyer' && (
                        <React.Fragment>
                          <p>
                            <small>
                              By creating an account you confirm your acceptance of our{' '}
                              <a href="/terms-of-use" target="_blank" rel="noopener noreferrer">
                                Terms of Use
                              </a>
                            </small>
                          </p>
                          {currentlySending ? (
                            <LoadingButton />
                          ) : (
                            <p>
                              <input
                                className="au-btn"
                                type="submit"
                                value="Create your account"
                                onClick={onSubmitClicked}
                              />
                            </p>
                          )}
                        </React.Fragment>
                      )}
                    </Form>
                  </article>
                </Layout>
              )}
            </div>
          </div>
        </DocumentTitle>
      </div>
    )
  }
}

SignupForm.propTypes = {
  csrf_token: PropTypes.string,
  model: PropTypes.string.isRequired,
  signupForm: PropTypes.object.isRequired,
  signupSuccess: PropTypes.bool,
  currentlySending: PropTypes.bool.isRequired,
  isBuyer: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired,
  signupErrorCode: PropTypes.number,
  signupABN: PropTypes.string,
  emailValidators: PropTypes.object.isRequired,
  emailErrorMessages: PropTypes.object.isRequired,
  submitClicked: PropTypes.bool.isRequired,
  onSubmitClicked: PropTypes.func.isRequired,
  onSubmitFailed: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

SignupForm.defaultProps = {
  csrf_token: '',
  signupErrorCode: null,
  signupABN: '',
  signupSuccess: null
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(SignupForm)
