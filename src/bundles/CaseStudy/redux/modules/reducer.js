import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form';

import casestudy from './casestudy';
import errorMessage from './errorMessage';
import form_options from './form_options';

export default combineReducers({
  casestudy,
  form_options,
  errorMessage,
  options: (state = {}) => state,
  ...createForms({
    caseStudyForm: {}
  })
})
