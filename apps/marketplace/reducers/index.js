/* eslint-disable camelcase */
import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'
import appReducer from './appReducer'
import brief from './briefReducers'
import user from './memberInfoReducers'
import mediaReducer from './mediaReducer'
import errorMessage from './errorMessage'
import form_options from './form_options'

export default combineReducers({
  app: appReducer,
  user,
  brief,
  form_options,
  errorMessage,
  media: mediaReducer,
  ...createForms({
    signupForm: {},
    createUserForm: {},
    briefResponseForm: {},
    resetPasswordEmailForm: {},
    resetPasswordForm: {}
  })
})
