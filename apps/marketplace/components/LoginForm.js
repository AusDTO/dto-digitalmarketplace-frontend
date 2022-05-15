import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { rootPath } from 'marketplace/routes'
import DocumentTitle from 'react-document-title'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react'
import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import { required, validEmail, passwordLength } from '../components/validators'
import LoadingButton from './LoadingButton/LoadingButton'
import style from '../../marketplace/main.scss'
import { DMP_LOCKOUT } from '../../marketplace/constants/constants'

const disabledAttribute = {}
if (DMP_LOCKOUT) disabledAttribute.disabled = true
else disabledAttribute.disabled = false

const LoginForm = props => {
  const { model, submitClicked, handleSubmit, currentlySending } = props
  const query = new URLSearchParams(window.location.search)
  const isForcedLogout = query.get('redirected') !== null

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
            {isForcedLogout && (
              <AUpageAlert as="info" className={`${style.marginBottom2}`}>
                <span>You have been logged out.</span>
              </AUpageAlert>
            )}
            <ErrorBox
              title="There was a problem signing in"
              model={model}
              submitClicked={submitClicked}
              setFocus={setFocus}
            />
            <header className="page-heading page-heading-without-breadcrumb">
              <h1 className="au-display-xl">Sign in to the Marketplace</h1>
              {!DMP_LOCKOUT && (
                <p>
                  New to the Marketplace? <a href={`${rootPath}/signup`}>Create your account</a>
                </p>
              )}
            </header>
            {DMP_LOCKOUT && (
              <AUpageAlert as="error" className={`${style.marginTop2} ${style.marginBottom2}`}>
                <div>
                  <p>
                    Digital Marketplace is closed while it is moving to{` `}
                    <a href="/api/2/r/buyict">BuyICT</a>.
                  </p>
                </div>
              </AUpageAlert>
            )}
            <Form model={model} id="login" onSubmit={data => handleSubmit(data)}>
              <Textfield
                model={`${model}.emailAddress`}
                name="emailAddress"
                id="emailAddress"
                htmlFor="emailAddress"
                label="Email"
                type="email"
                validators={{ required, validEmail }}
                {...disabledAttribute}
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
                {...disabledAttribute}
                messages={{
                  passwordLength: 'Your password should be at least 10 characters'
                }}
              />
              {!DMP_LOCKOUT && (
                <p className={style.paddingBottom2}>
                  <a href={`${rootPath}/reset-password`}>Forgot your password?</a>
                </p>
              )}
              {currentlySending ? (
                <LoadingButton />
              ) : (
                <input
                  className="au-btn"
                  type="submit"
                  value="Sign in"
                  onClick={submitClicked}
                  {...disabledAttribute}
                />
              )}
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
