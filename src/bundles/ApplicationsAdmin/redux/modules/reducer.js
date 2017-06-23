import { combineReducers } from 'redux';

import applications from './applications';
import assessments from './assessments';
import users from './users';

export default combineReducers({
  applications,
  assessments,
  users,
  form_options: (state = {}) => state,
  meta: (state = {}) => state,
  options: (state = {}) => state,
})
