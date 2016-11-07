import merge from 'lodash/merge';

const STEP_NEXT = 'step/next';
const STEP_PRE = 'step/pre';
const STEP_MODEL = 'step/model';


export default function reducer(state = {}, action = {}) {
  const { type, model } = action;
  switch (type) {
    case STEP_MODEL:
      return Object.assign({}, merge(state, model));
    default:
      return state;
  }
}

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

