import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import { required, validEmail } from 'shared/validators'
import LoadingButton from 'shared/LoadingButton/LoadingButton'

import styles from './Signup.scss'

const Signup = props => {
  const { model, submitClicked, handleSubmit, currentlySending, displayStepTwo } = props

  let hasFocused = false
  const setFocus = e => {
    if (!hasFocused) {
      hasFocused = true
      e.focus()
    }
  }

  return (
    <div>
      {displayStepTwo
        ? <div>
            <AUpageAlert as="success">
              <h4>Thanks, this request has been sent to the ORAMS team</h4>
            </AUpageAlert>
            <div className="au-display-xl">What happens next?</div>
            <div className={styles.spacer}>An email has been sent to ORAMS panel manager to approve your access.</div>
            <div className="au-display-lg">
              <strong>If you are approved</strong>
            </div>
            <div className={styles.spacer}>You will receive an email to activate your account.</div>
            <div className="au-display-lg">
              <strong>If you don’t receive an email within 5 working days </strong>
            </div>
            <div className={styles.spacer}>
              Check to see if it’s been classified as spam or contact{' '}
              <a href="mailto:orams@ato.gov.au">
                <strong>orams@ato.gov.au</strong>
              </a>{' '}
              for assistance.
            </div>
          </div>
        : <div className="row">
            <div className="col-sm-8 col-xs-12">
              <article role="main">
                <ErrorBox
                  title="There was a problem creating your account"
                  model={model}
                  submitClicked={submitClicked}
                  setFocus={setFocus}
                />
                <div className={styles.stepTitle}>Step 1 of 3</div>
                <header className="page-heading page-heading-without-breadcrumb">
                  <h1 className="au-display-xl">Create an account</h1>
                </header>
                <p>
                  To create an account you must be a Rehabilitation Case Manager in a<br />
                  Federal Government agency authorised to use the ORAMS panel.
                </p>
                <Form model={model} id="signup" onSubmit={data => handleSubmit(data)}>
                  <Textfield
                    model={`${model}.name`}
                    name="name"
                    id="name"
                    htmlFor="name"
                    label="Full name"
                    type="text"
                    validators={{ required }}
                    messages={{
                      required: 'Your name is required'
                    }}
                  />
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
                  <p>
                    By creating an account you confirm your acceptance of our{' '}
                    <a href="/orams/terms-of-use" rel="external">
                      <strong>Terms of Use</strong>
                    </a>
                  </p>
                  <p>
                    {currentlySending
                      ? <LoadingButton />
                      : <input className="au-btn" type="submit" value="Create your account" onClick={submitClicked} />}
                  </p>
                </Form>
              </article>
            </div>
          </div>}
    </div>
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
