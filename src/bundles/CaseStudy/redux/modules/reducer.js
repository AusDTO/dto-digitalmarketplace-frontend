import { combineReducers } from 'redux'
import { combineForms } from 'react-redux-form';

import casestudy from './casestudy';
import errorMessage from './errorMessage';
import form_options from './form_options';

export default combineReducers({
  casestudy,
  form_options,
  form: combineForms({
    caseStudy: {}
  }, 'form'),
  errorMessage,
})
