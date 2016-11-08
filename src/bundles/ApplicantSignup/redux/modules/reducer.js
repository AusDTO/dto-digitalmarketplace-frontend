import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form';

import errorMessage from '../../../../shared/reduxModules/errorMessage';
import form_options from '../../../../shared/reduxModules/form_options';

export default combineReducers({
  form_options,
  errorMessage,
  options: (state = {}) => state,
  ...createForms({
    yourInfoForm: {},
    businessDetailsForm: {},
    caseStudyForm: {},
  })
})
