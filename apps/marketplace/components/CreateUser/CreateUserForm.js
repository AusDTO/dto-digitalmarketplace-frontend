import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import styles from './CreateUserForm.scss'
import LoadingButton from '../../components/LoadingButton/LoadingButton'

const CreateUserForm = props => {
  const { model, handleSubmit, onSubmitClicked, submitClicked, currentlySending } = props

  let hasFocused = false
  const setFocus = e => {
    if (!hasFocused) {
      hasFocused = true
      e.focus()
    }
  }

  return (
    <div>
      <ErrorBox
        title="There was a problem creating your account"
        model={model}
        submitClicked={submitClicked}
        setFocus={setFocus}
      />
      <div>
        <h1 className="au-display-xl">Add a password</h1>
        <p>To finish creating your account please provide the following details.</p>
      </div>
      <Form model={model} id="createuser" onSubmit={data => handleSubmit(data)}>
        <Textfield
          model={`${model}.password`}
          name="password"
          id="password"
          htmlFor="password"
          label="Password"
          type="password"
          description="At least 10 characters"
          validators={{ length: val => val && val.length >= 10 }}
          messages={{
            length: 'Your password must be at least 10 characters'
          }}
        />
        <CheckboxDetailsField
          model={`${model}.agree`}
          id="agree"
          name="agree"
          value="agree"
          label={
            <span>
              <span>I accept the </span>
              <a href="/terms-of-use" target="_blank" rel="noopener noreferrer">
                Terms of Use
              </a>
            </span>
          }
          detailsModel={model}
          validators={{ required: val => val }}
          messages={{ required: 'Accept Terms of Use' }}
        />
        <div className={styles.formSubmitBtnWrapper}>
          {currentlySending ? (
            <LoadingButton />
          ) : (
            <input className="au-btn" type="submit" value="Join the Marketplace" onClick={onSubmitClicked} />
          )}
        </div>
      </Form>
    </div>
  )
}

CreateUserForm.defaultProps = {
  submitClicked: null
}

CreateUserForm.propTypes = {
  model: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmitClicked: PropTypes.func.isRequired,
  submitClicked: PropTypes.number
}

export default CreateUserForm
