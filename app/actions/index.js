import { SET_AUTH SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/AppConstants';

export function setAuthState(newState) {
  return { type: SET_AUTH, newState };
}