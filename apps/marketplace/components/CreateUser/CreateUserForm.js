import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import styles from './CreateUserForm.scss'
import LoadingButton from '../../components/LoadingButton/LoadingButton'

const CreateUserForm = props => {
  const { model, initialState, handleSubmit, onSubmitClicked, submitClicked, currentlySending } = props
  const userType = initialState.user_type

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
      {userType === 'buyer'
        ? <div>
            <h1>Add your name and password</h1>
            <p>To finish creating your account please provide the following details.</p>
          </div>
        : <div>
            <h1>Add a password</h1>
            <p>To finish creating your account please provide the following details.</p>
          </div>}
      <Form model={model} id="createuser" onSubmit={data => handleSubmit(data)}>
        {userType === 'buyer' &&
          <Textfield
            model={`${model}.name`}
            name="name"
            id="name"
            htmlFor="name"
            label="Full name"
            description="This name will be used throughout the Marketplace"
            validators={{ required: val => val && val.length }}
            messages={{ required: 'A name is required' }}
          />}

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
              <a href="/terms-of-use" target="_blank" rel="external">
                Terms of Use
              </a>
            </span>
          }
          description="The terms of use"
          detailsModel={model}
          validators={{ required: val => val }}
          messages={{ required: 'Accept Terms of Use' }}
        />
        <div className={styles.formSubmitBtnWrapper}>
          {currentlySending
            ? <LoadingButton />
            : <input className="au-btn" type="submit" value="Join the Marketplace" onClick={onSubmitClicked} />}
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
  initialState: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmitClicked: PropTypes.func.isRequired,
  submitClicked: PropTypes.number
}

export default CreateUserForm
