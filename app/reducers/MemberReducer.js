/*
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import { SET_AUTH, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/AppConstants';
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');
import apiService from '../services/api';

// The initial application state
const initialState = {
  currentlySending: false,
  loggedIn: apiService.fetchMemberInfo(),
  errorMessage: ''
};

// Takes care of changing the application state
export default function MemberReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return assign({}, state, {
        loggedIn: action.newState
      });
      break;
    case SENDING_REQUEST:
      return assign({}, state, {
        currentlySending: action.sending
      });
      break;
    case SET_ERROR_MESSAGE:
      return assign({}, state, {
        errorMessage: action.message
      });
    default:
      return state;
  }
}