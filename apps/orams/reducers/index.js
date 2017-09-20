/* eslint-disable camelcase */
import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form';

import appReducer from './appReducer'
import application from './sellerRegistrationReducer';
import errorMessage from './errorMessageReducer';
import form_options from './formOptionsReducer';

export default combineReducers({
  app: appReducer,
  form_options,
  errorMessage,
  application,
  options: (state = {}) => state,
  ...createForms({
    businessDetailsForm: {},
    businessInfoForm: {},
    yourInfoForm: {},
    toolsForm: {},
    awardsForm: {
        awards: [],
        certifications: [],
        boards: []
    },
    submitStepForm: {},
  })
})