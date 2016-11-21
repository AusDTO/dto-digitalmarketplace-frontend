import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form';


import businessDetails from './businessDetails';
import yourinfo from './yourinfo';
import enterpassword from './enterpassword';
import signup from './signup';
import errorMessage from '../../../../shared/reduxModules/errorMessage';
import form_options from '../../../../shared/reduxModules/form_options';

export default combineReducers({
  businessDetails,
  yourinfo,
  enterpassword,
  signup,
  form_options,
  errorMessage,
  options: (state = {}) => state,
  ...createForms({
    yourInfoForm: {},
    businessDetailsForm: {},
    enterPasswordForm: {},
    signupForm: {},
  })
})
