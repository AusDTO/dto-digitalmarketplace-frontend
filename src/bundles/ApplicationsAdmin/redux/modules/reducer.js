import { combineReducers } from 'redux';

import applications from './applications';
import assessments from './assessments';

export default combineReducers({
  applications,
  assessments,
  form_options: (state = {}) => state,
  meta: (state = {}) => state,
  options: (state = {}) => state,
})
