import { combineReducers } from 'redux';

import applications from './applications';

export default combineReducers({
  applications,
  assessments: (state = {}) => state,
  form_options: (state = {}) => state,
  meta: (state = {}) => state,
  options: (state = {}) => state,
})
