import { combineReducers } from 'redux';

import application from './application';
import applications from './applications';
import assessments from './assessments';
import brief from './brief';
import users from './users';
import evidence from './evidence'

export default combineReducers({
  application,
  applications,
  assessments,
  evidence,
  brief,
  users,
  form_options: (state = {}) => state,
  meta: (state = {}) => state,
  options: (state = {}) => state,
})
