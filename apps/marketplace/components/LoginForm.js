import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import DocumentTitle from 'react-document-title'

import ErrorBox from '../components/shared/form/ErrorBox'
import Textfield from '../components/shared/form/Textfield'
import { required, validEmail, passwordLength } from '../components/validators'
import LoadingButton from './LoadingButton/LoadingButton'

const LoginForm = props => {
  const { model, submitClicked, handleSubmit, currentlySending } = props

  let hasFocused = false
  const setFocus = e => {
    if (!hasFocused) {
      hasFocused = true
      e.focus()
    }
  }

  return (
    <div className="row">
      <DocumentTitle title="Login - Digital Marketplace">
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          <article role="main">
            <ErrorBox
              title="There was a problem signing in"
              model={model}
              submitClicked={submitClicked}
              setFocus={setFocus}
            />
            <header className="page-heading page-heading-without-breadcrumb">
              <h1 className="uikit-display-5">Sign in to the Marketplace</h1>
            </header>
            <Form model={model} id="login" onSubmit={data => handleSubmit(data)}>
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
              {currentlySending
                ? <LoadingButton />
                : <input className="uikit-btn" type="submit" value="Sign in" onClick={submitClicked} />}
            </Form>
          </article>
        </div>
      </DocumentTitle>
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
  currentlySending: PropTypes.bool
}

export default LoginForm
