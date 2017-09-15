const STEP_NEXT = 'step/next';
const STEP_PRE = 'step/pre';
const APP_SUBMIT = 'application/submit';
const APP_PRE_SUBMIT = 'application/pre-submit';
const APP_POST_SUBMIT = 'application/post-submit';
const APP_SAVED = 'application/saved';
const APP_ERROR = 'application/error';
const LINK_CLICK = 'link/click';

export default function reducer(state = {}, action = {}) {
  const {type, payload} = action;
  switch (type) {
    case APP_SUBMIT:
      return Object.assign({}, state, payload.application);
    case APP_SAVED:
      return Object.assign({}, state, {saved: true});
    case APP_ERROR:
      return Object.assign({}, state, {error: true});
    case STEP_PRE:
      return Object.assign({}, state, {saved: void 0});
    case APP_PRE_SUBMIT:
      return Object.assign({}, state, {error: void 0});
    default:
      return state;
  }
};
