import { combineReducers } from 'redux';

import agency from './agency';
import application from './application';
import applications from './applications';
import assessments from './assessments';
import brief from './brief';
import users from './users';
import evidence from './evidence'
import report from './report'

export default combineReducers({
  agency,
  application,
  applications,
  assessments,
  evidence,
  report,
  brief,
  users,
  form_options: (state = {}) => state,
  meta: (state = {}) => state,
  options: (state = {}) => state,
})
