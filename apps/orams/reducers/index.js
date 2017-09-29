/* eslint-disable camelcase */
import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'

import appReducer from './appReducer'
import userReducer from './userReducer'
import errorMessage from './errorMessage'
import form_options from './form_options'

export default combineReducers({
  app: appReducer,
  user: userReducer,
  form_options,
  errorMessage,
  options: (state = {}) => state,
  ...createForms({
    resetPasswordEmailForm: {},
    resetPasswordForm: {},
    businessDetailsForm: {},
    businessInfoForm: {},
    yourInfoForm: {},
    toolsForm: {},
    awardsForm: {},
    submitStepForm: {},
    loginForm: {}
  })
})
