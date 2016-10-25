import { combineReducers } from 'redux'
import { combineForms } from 'react-redux-form';

import casestudy from './casestudy';
import errorMessage from './errorMessage';

export default combineReducers({
  casestudy,
  form_options: (state = {}) => state,
  form: combineForms({
    caseStudy: {
      outcome: Array(2).fill(''),
      projectLinks: Array(2).fill('')
    }
  }, 'form'),
  errorMessage,
})
