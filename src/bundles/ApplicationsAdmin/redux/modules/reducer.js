import { combineReducers } from 'redux'
// import { createForms } from 'react-redux-form';

import applications from './applications';
// import form_options from '../../../../shared/reduxModules/form_options';

export default combineReducers({
  applications,
  form_options: (state = {}) => state,
  meta: (state = {}) => state,
  options: (state = {}) => state,
})
