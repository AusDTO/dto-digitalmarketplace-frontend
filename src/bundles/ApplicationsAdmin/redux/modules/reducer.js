import { combineReducers } from 'redux';

import application from './application';
import applications from './applications';
import assessments from './assessments';
import users from './users';

export default combineReducers({
  application,
  applications,
  assessments,
  users,
  form_options: (state = {}) => state,
  meta: (state = {}) => state,
  options: (state = {}) => state,
})
