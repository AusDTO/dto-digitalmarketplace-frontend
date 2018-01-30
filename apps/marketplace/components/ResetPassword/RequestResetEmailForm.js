import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import PageAlert from '@gov.au/page-alerts'
import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import { required, validEmail } from '../validators'

const RequestResetEmailForm = props => {
  const { model, user, submitClicked, handleSubmit } = props
  const { resetPasswordEmailSuccess } = user

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
          {resetPasswordEmailSuccess
            ? <PageAlert as="success">
                <span>
                  We have sent a link to reset the password.<br />
                  Check your spam folder if it does not arrive.
                </span>
              </PageAlert>
            : <ErrorBox
                title="There was a problem sending your reset email"
                model={model}
                submitClicked={submitClicked}
                setFocus={setFocus}
              />}
          <header className="page-heading page-heading-without-breadcrumb">
            <h1 className="uikit-display-5">Reset password</h1>
            <span>
              Enter your email address and we&#39;ll send you a link to reset your password. Password reset links are
              valid for 24 hours.
            </span>
          </header>
          <Form model={model} id="sendResetEmail" onSubmit={data => handleSubmit(data)}>
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

RequestResetEmailForm.propTypes = {
  model: PropTypes.string.isRequired,
  user: PropTypes.shape({
    resetPasswordEmailSuccess: PropTypes.bool
  }).isRequired,
  submitClicked: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default RequestResetEmailForm
