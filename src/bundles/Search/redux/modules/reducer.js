import { combineReducers } from 'redux';

import results from './results';
import query from './query';

export default combineReducers({
  options: (state = {}) => state,
  results,
  query
});