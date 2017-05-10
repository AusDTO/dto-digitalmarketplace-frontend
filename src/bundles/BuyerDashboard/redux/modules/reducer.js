import { combineReducers } from 'redux';

import team from './team';

export default combineReducers({
  form_options: (state = {}) => state,
  meta: (state = {}) => state,
  options: (state = {}) => state,
  teammembers: (state = {}) => state,
  flag: (state = {}) => state,
  team
})
