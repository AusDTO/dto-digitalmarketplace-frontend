import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import ErrorBox from '../../components/shared/form/ErrorBox'
import Textfield from '../../components/shared/form/Textfield'
import PageAlert from '@gov.au/page-alerts'
import { required, validEmail } from '../validators'

export const RequestResetEmailForm = ({ model, form, user, submitClicked, handleSubmit }) => {
  let { resetPasswordEmailFailure, resetPasswordEmailSuccess } = user
  let { valid } = form

  let hasFocused = false
  const setFocus = e => {
    if (!hasFocused) {
      hasFocused = true
      e.focus()
    }
  }

  return (
    <div className="row">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          {resetPasswordEmailFailure &&
            valid &&
            <PageAlert as="error">
              <h4>We were unable to send your password reset email</h4>
              <span>
                <p>
                  Please try again later or{' '}
                  <a href="/contact-us" target="_blank" rel="external">
                    {' '}contact us{' '}
                  </a>{' '}
                  for assistance.
                </p>
              </span>
            </PageAlert>}
          {resetPasswordEmailSuccess &&
            <PageAlert as="success">
              <span>
                If the email address you&#39;ve entered belongs to a Marketplace account, we&#39;ll send a link to reset
                the password.
              </span>
            </PageAlert>}
          <ErrorBox model={model} submitClicked={submitClicked} setFocus={setFocus} />
          <header className="page-heading page-heading-without-breadcrumb">
            <h1 className="uikit-display-5">Reset password</h1>
            <span>
              Enter your email address and we&#39;ll send you a link to reset your password. Password reset links are
              valid for 24 hours.
            </span>
          </header>
          <Form model={model} id="sendResetEmail" onSubmit={model => handleSubmit(model)}>
            <Textfield
              model={`${model}.email_address`}
              name="email_address"
              id="email_address"
              htmlFor="email_address"
              description="Enter the email address you used to register with the Marketplace"
              validators={{ required, validEmail }}
              messages={{
                required: 'Your email is required',
                validEmail: 'A valid email is required.'
              }}
            />
            <p>
              <input className="uikit-btn" type="submit" value="Send reset password" onClick={submitClicked} />
            </p>
          </Form>
        </article>
      </div>
    </div>
  )
}
