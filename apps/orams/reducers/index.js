/* eslint-disable camelcase */
import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form';

import appReducer from './appReducer'
import errorMessage from './errorMessage';
import form_options from './form_options';

export default combineReducers({
  app: appReducer,
  form_options,
  errorMessage,
  options: (state = {}) => state,
  ...createForms({
    businessDetailsForm: {},
    businessInfoForm: {},
    yourInfoForm: {},
    toolsForm: {},
    awardsForm: {},
    submitStepForm: {},
  })
})