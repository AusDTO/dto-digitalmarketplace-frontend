import { combineReducers } from 'redux'
import brief from './briefReducers'
import user from './memberInfoReducers'
import errorMessage from './errorMessage'
import form_options from './form_options'
import { createForms } from 'react-redux-form'

export default combineReducers({
  user,
  brief,
  form_options,
  errorMessage,
  ...createForms({
    signupForm: {},
    createUserForm: {},
    briefResponseForm: {}
  })
})
