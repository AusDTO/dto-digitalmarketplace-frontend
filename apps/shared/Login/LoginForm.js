import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { Link } from 'react-router-dom'

import ErrorBox from '../../shared/form/ErrorBox'
import Textfield from '../../shared/form/Textfield'
import { required, validEmail, passwordLength } from '../../shared/validators'
import LoadingButton from '../LoadingButton/LoadingButton'

import styles from './LoginForm.scss'

const LoginForm = props => {
  const { model, submitClicked, handleSubmit, currentlySending, rootPath } = props

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
          <ErrorBox
            title="There was a problem signing in"
            model={model}
            submitClicked={submitClicked}
            setFocus={setFocus}
          />
          <header className="page-heading page-heading-without-breadcrumb">
            <h1>Sign in to the Marketplace</h1>
          </header>
          <p>
            New to the Marketplace? <Link to={`${rootPath}/signup`}>Create your account.</Link>
          </p>
          <Form model={model} id="login" onSubmit={data => handleSubmit(data)}>
            <p>
              <Textfield
                model={`${model}.emailAddress`}
                name="emailAddress"
                id="emailAddress"
                htmlFor="emailAddress"
                label="Email"
                type="email"
                validators={{ required, validEmail }}
                messages={{
                  required: 'Your email is required',
                  validEmail: 'A validly formatted email is required.'
                }}
              />
            </p>
            <p>
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
            </p>
            <p>
              <Link to={`${rootPath}/reset-password`}>Forgot your password?</Link>
            </p>
            <p className={styles.loginButton}>
              {currentlySending
                ? <LoadingButton />
                : <input className="uikit-btn" type="submit" value="Sign in" onClick={submitClicked} />}
            </p>
          </Form>
        </article>
      </div>
    </div>
  )
}

LoginForm.defaultProps = {
  submitClicked: null,
  handleSubmit: null,
  currentlySending: false
}

LoginForm.propTypes = {
  model: PropTypes.string.isRequired,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func,
  currentlySending: PropTypes.bool,
  rootPath: PropTypes.string.isRequired
}

export default LoginForm
