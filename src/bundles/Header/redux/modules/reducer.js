import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form';
import project from './project'

export default combineReducers({
  project,
  dashboardText: (state = {}) => state,
  dashboardUrl: (state = {}) => state,
  notificationCount: (state = {}) => state,
  form_options: (state = {}) => state,
  isAuthenticated: (state = {}) => state,
  loginUrl: (state = {}) => state,
  logoutUrl: (state = {}) => state,
  options: (state = {}) => state,
  registerText: (state = {}) => state,
  registerUrl: (state = {}) => state,
  userType: (state = {}) => state,
  isRecruiterFlag: (state = {}) => state,
  isHybridFlag: (state = {}) => state,
})
