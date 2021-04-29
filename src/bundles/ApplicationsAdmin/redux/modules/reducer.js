import { combineReducers } from 'redux';

import agency from './agency';
import application from './application';
import applications from './applications';
import assessments from './assessments';
import brief from './brief';
import users from './users';
import evidence from './evidence'
import downloadReports from './activity_reports'

export default combineReducers({
  agency,
  application,
  applications,
  assessments,
  evidence,
  brief,
  users,
  downloadReports,
  form_options: (state = {}) => state,
  meta: (state = {}) => state,
  options: (state = {}) => state,
})
