import React from 'react'
import { Form } from 'react-redux-form'
import ErrorBox from '../../components/shared/form/ErrorBox'
import Textfield from '../../components/shared/form/Textfield'
import PageAlert from '@gov.au/page-alerts'
import { passwordLength } from '../validators'
import { rootPath } from '../../routes'

export const ResetPasswordForm = ({ model, user, submitClicked, handleSubmit }) => {
  let { resetPasswordSuccess, getResetDataSuccess, errorMessage } = user

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
          {(resetPasswordSuccess === false || getResetDataSuccess === false) &&
            <PageAlert as="error">
              <h4>We are unable to reset your password</h4>
              <span>
                {errorMessage}
                {getResetDataSuccess === false &&
                  <span>
                    Try <a href={`${rootPath}/reset-password`}> resending </a>your reset password email
                  </span>}
              </span>
            </PageAlert>}
          {resetPasswordSuccess &&
            <PageAlert as="success">
              <h4>You have successfully changed your password</h4>
              <span>
                <p>
                  Please <a href="/login"> login </a> to continue.
                </p>
              </span>
            </PageAlert>}
          <ErrorBox model={model} submitClicked={submitClicked} setFocus={setFocus} />
          <header className="page-heading page-heading-without-breadcrumb">
            <h1 className="uikit-display-5">Reset password</h1>
          </header>
          <Form
            model={model}
            id="resetPassword"
            validators={{
              '': {
                // Form-level validator
                passwordsMatch: val => passwordsMatch(val)
              }
            }}
            onSubmit={model => handleSubmit(model)}
          >
            <Textfield
              model={`${model}.password`}
              name="password"
              id="password"
              htmlFor="password"
              label="Password"
              type="password"
              description="Your password should be at least 10 characters"
              validators={{ passwordLength }}
              messages={{
                passwordLength: 'Your password should be at least 10 characters'
              }}
            />

            <Textfield
              model={`${model}.confirmPassword`}
              name="confirmPassword"
              id="confirmPassword"
              htmlFor="confirmPassword"
              label="Password"
              type="password"
              description="Repeat password used above"
              validators={{
                passwordLength
              }}
              messages={{
                passwordLength: 'Your password confirmation should be at least 10 characters. ',
                passwordsMatch: 'Passwords do not match.'
              }}
            />
            <p>
              <input className="uikit-btn" type="submit" value="Reset password" onClick={submitClicked} />
            </p>
          </Form>
        </article>
      </div>
    </div>
  )
}
