import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form';

import casestudy from './casestudy';
import errorMessage from '../../../../shared/reduxModules/errorMessage';
import form_options from '../../../../shared/reduxModules/form_options';

export default combineReducers({
  casestudy,
  form_options,
  errorMessage,
  options: (state = {}) => state,
  ...createForms({
    caseStudyForm: {}
  })
})
