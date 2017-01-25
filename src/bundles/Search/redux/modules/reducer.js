import { combineReducers } from 'redux';

import search from './search';

export default combineReducers({
  options: (state = {}) => state,
  form_options: (state = {}) => state,
  search
});