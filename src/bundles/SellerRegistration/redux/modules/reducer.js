import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form';

import businessdetails from './businessdetails';
import yourinfo from './yourinfo';
import errorMessage from '../../../../shared/reduxModules/errorMessage';
import form_options from '../../../../shared/reduxModules/form_options';

export default combineReducers({
  businessdetails,
  yourinfo,
  form_options,
  errorMessage,
  options: (state = {}) => state,
  ...createForms({
    yourInfoForm: {},
    businessdetailsForm: {},
  })
})
