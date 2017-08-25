import { combineReducers } from 'redux'
import app from './appReducer'
import user from './memberInfoReducers'
import errorMessage from './errorMessage'
import form_options from './form_options'
import { createForms } from 'react-redux-form'

export default combineReducers({
  user,
  form_options,
  errorMessage,
  ...createForms({
    signupForm: {},
    createUserForm: {}
  }),
  app
})
