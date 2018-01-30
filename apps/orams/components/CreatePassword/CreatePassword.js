import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import PageAlert from '@gov.au/page-alerts'

import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import { passwordLength } from 'shared/validators'
import LoadingButton from 'shared/LoadingButton/LoadingButton'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

import styles from './CreatePassword.scss'

const Signup = props => {
  const { model, submitClicked, handleSubmit, currentlySending, createUserSuccess, userToCreateData } = props

  let hasFocused = false
  const setFocus = e => {
    if (!hasFocused) {
      hasFocused = true
      e.focus()
    }
  }

  return (
    <main>
      {userToCreateData ? (
        <div>
          {createUserSuccess ? (
            <div className={styles.successSection}>
              <PageAlert as="success">
                <h4>
                  Success, your account has been activated. Please{' '}
                  <a href="/orams/login">
                    <strong>login</strong>
                  </a>
                </h4>
              </PageAlert>
            </div>
          ) : (
            <div className="row">
              <div className="col-sm-8 col-xs-12">
                <article role="main">
                  <ErrorBox
                    title="There was a problem activating your account"
                    model={model}
                    submitClicked={submitClicked}
                    setFocus={setFocus}
                  />
                  <div className={styles.stepTitle}>Step 3 of 3</div>
                  <h1 className="uikit-display-6">Create a password</h1>
                  <Form model={model} id="createUser" onSubmit={data => handleSubmit(data)}>
                    <Textfield
                      model={`${model}.password`}
                      name="password"
                      id="password"
                      htmlFor="password"
                      label="Password"
                      type="password"
                      description="At least 10 characters"
                      validators={{ passwordLength }}
                      messages={{
                        passwordLength: 'Your password should be at least 10 characters'
                      }}
                    />
                    <CheckboxDetailsField
                      model={`${model}.agree`}
                      id="agree"
                      name="agree"
                      value="agree"
                      label={
                        <span>
                          I accept the{' '}
                          <a href="/orams/terms-of-use" rel="external">
                            <strong>Terms of Use</strong>
                          </a>
                        </span>
                      }
                      description="The terms of use"
                      detailsModel={model}
                      validators={{ required: val => val }}
                      messages={{ required: 'Accept Terms of Use' }}
                    />
                    <br />
                    <br />
                    {currentlySending ? (
                      <LoadingButton />
                    ) : (
                      <input
                        className="uikit-btn"
                        type="submit"
                        value="Activate your account"
                        onClick={submitClicked}
                      />
                    )}
                  </Form>
                </article>
              </div>
            </div>
          )}
        </div>
      ) : (
        <LoadingIndicatorFullPage />
      )}
    </main>
  )
}

Signup.defaultProps = {
  submitClicked: null,
  handleSubmit: null,
  currentlySending: false
}

Signup.propTypes = {
  model: PropTypes.string.isRequired,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func,
  currentlySending: PropTypes.bool
}

export default Signup
