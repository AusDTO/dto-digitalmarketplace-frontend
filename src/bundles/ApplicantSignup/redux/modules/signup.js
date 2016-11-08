import merge from 'lodash/merge';

const STEP_NEXT = 'step/next';
const STEP_PRE = 'step/pre';
const STEP_MODEL = 'step/model';
const APP_SUBMIT = 'application/submit';
const APP_PRE_SUBMIT = 'application/pre-submit';
const APP_POST_SUBMIT = 'application/post-submit';


export default function reducer(state = {}, action = {}) {
  const { type, model } = action;
  switch (type) {
    case STEP_MODEL:
      return Object.assign({}, merge(state, model));
    default:
      return state;
  }
}

export const preSubmit = () => ({ type: APP_PRE_SUBMIT });
export const postSubmit = () => ({ type: APP_POST_SUBMIT });

export const preStep = () => ({ type: STEP_PRE });
export const next = () => ({ type: STEP_PRE });
export const syncSteps = (model) => ({ type: STEP_MODEL, model })

export const stepNext = (transition, to) => {
  return dispatch => {
    dispatch({ type: STEP_NEXT, to });
    transition(to);
  }
}

export const stepNextPersist = (transition, to) => {
  return (dispatch, getState, api) => {
    dispatch(preStep());
    return api('/persist')
      .then(json => {
        dispatch({ type: STEP_NEXT, to });
        return dispatch(syncSteps())
      }).then(() => {
        transition(to);
      });
  }
}

const getAllFormValues = (state) => {
  return Object.keys(state)
    .filter(key => key.match(/Form$/))
    .reduce((result, key) => {
      result[key] = state[key];
      return result;
    }, {});
}

export const submitApplication = ({ pathname }) => {
  return (dispatch, getState, api) => {
    dispatch(preSubmit());
    const payload = getAllFormValues(getState());
    return api(window.location.pathname, {
      method: 'POST',
      body: JSON.stringify({ ...payload })
    }).then((json) => {
      return dispatch({
        type: APP_SUBMIT,
        payload
      })
    }).then(() => dispatch(postSubmit));
  }
}

