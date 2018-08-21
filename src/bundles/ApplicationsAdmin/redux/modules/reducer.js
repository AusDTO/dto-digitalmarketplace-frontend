import { combineReducers } from 'redux';

import application from './application';
import applications from './applications';
import assessments from './assessments';
import brief from './brief';
import users from './users';

export default combineReducers({
  application,
  applications,
  assessments,
  brief,
  users,
  form_options: (state = {}) => state,
  meta: (state = {}) => state,
  options: (state = {}) => state,
})
