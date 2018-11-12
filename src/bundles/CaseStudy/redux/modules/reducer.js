import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form';

import casestudy from './casestudy';
import casestudies from './casestudies';
import errorMessage from '../../../../shared/reduxModules/errorMessage';
import form_options from '../../../../shared/reduxModules/form_options';
import application from '../../../SellerRegistration/redux/modules/application';

export default combineReducers({
  application,
  casestudy,
  casestudies,
  errorMessage,
  form_options,
  meta: (state = {}) => state,
  form_options: (state = {}) => state,
  options: (state = {}) => state,
  ...createForms({
    caseStudyForm: {},
    assessmentForm: {}
  })
})
