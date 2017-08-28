import { combineReducers } from 'redux'
import appReducer from './appReducer'
import user from './memberInfoReducers'
import errorMessage from './errorMessage'
import form_options from './form_options'
import { createForms } from 'react-redux-form'

export default combineReducers({
  app: appReducer,
  user,
  form_options,
  errorMessage,
  ...createForms({
    signupForm: {},
    createUserForm: {}
  })
})
