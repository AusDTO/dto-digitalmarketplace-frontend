import { constants } from './application';

export default function reducer(state, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case constants.APP_SUBMIT:
      state = payload.application_errors;
      return state;
    default:
      return state ? state : [];
  }
}
