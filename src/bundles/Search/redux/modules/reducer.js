import { combineReducers } from 'redux';

import search from './search';
import pagination from './pagination';

export default combineReducers({
  options: (state = {}) => state,
  form_options: (state = {}) => state,
  pagination,
  search
});