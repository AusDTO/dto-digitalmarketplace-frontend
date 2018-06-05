import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import ErrorBox from '../../../shared/form/ErrorBox'
import Textfield from '../../../shared/form/Textfield'
import { passwordLength } from '../../../shared/validators'
import { rootPath } from '../../routes'

import styles from './ResetPassword.scss'

const ResetPasswordForm = props => {
  const { model, user, submitClicked, handleSubmit } = props
  const { resetPasswordSuccess } = user

  let hasFocused = false
  const setFocus = e => {
    if (!hasFocused) {
      hasFocused = true
      e.focus()
    }
  }

  return (
    <main>
      <div className="row">
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          <article role="main">
            {resetPasswordSuccess
              ? <AUpageAlert as="success">
                  <h4>You have successfully changed your password</h4>
                  <span>
                    <p>
                      Please <a href={`${rootPath}/login`}> login </a> to continue.
                    </p>
                  </span>
                </AUpageAlert>
              : <ErrorBox
                  title="There was a problem resetting your password"
                  model={model}
                  submitClicked={submitClicked}
                  setFocus={setFocus}
                />}
            <header className="page-heading page-heading-without-breadcrumb">
              <h1 className="au-display-xl">Reset password</h1>
            </header>
            <Form
              model={model}
              id="resetPassword"
              validators={{
                '': {
                  // Form-level validator
                  passwordsMatch: vals => vals.password === vals.confirmPassword
                }
              }}
              validateOn="submit"
              onSubmit={data => handleSubmit(data)}
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
              <p className={styles.buttonWrapper}>
                <input className="au-btn" type="submit" value="Reset password" onClick={submitClicked} />
              </p>
            </Form>
          </article>
        </div>
      </div>
    </main>
  )
}

ResetPasswordForm.defaultProps = {
  submitClicked: null,
  handleSubmit: null
}

ResetPasswordForm.propTypes = {
  user: PropTypes.shape({
    resetPasswordSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default ResetPasswordForm
