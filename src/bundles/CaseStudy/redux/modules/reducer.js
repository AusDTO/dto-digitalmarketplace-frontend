import { combineReducers } from 'redux'
import { combineForms } from 'react-redux-form';

import casestudy from './casestudy';
import errorMessage from './errorMessage';

export default combineReducers({
  casestudy,
  form_options: (state = { mode: 'add' }) => state,
  form: combineForms({
    caseStudy: {}
  }, 'form'),
  errorMessage,
})
