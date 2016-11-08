const STEP_NEXT = 'step/next';
const STEP_PRE = 'step/pre';
const APP_SUBMIT = 'application/submit';
const APP_PRE_SUBMIT = 'application/pre-submit';
const APP_POST_SUBMIT = 'application/post-submit';

export default function reducer(state = {}, action = {}) {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
};

// Helpers
const getAllFormValues = (state) => {
  return Object.keys(state)
    .filter(key => key.match(/Form$/))
    .reduce((result, key) => {
      result[key] = state[key];
      return result;
    }, {});
};


export const preSubmit = () => ({ type: APP_PRE_SUBMIT });
export const postSubmit = () => ({ type: APP_POST_SUBMIT });
export const submit = (payload) => ({ type: APP_SUBMIT, payload });

export const preSubmit = () => ({ type: APP_PRE_SUBMIT });
export const postSubmit = () => ({ type: APP_POST_SUBMIT });
export const submit = (payload) => ({ type: APP_SUBMIT, payload });

export const preStep = () => ({ type: STEP_PRE });
export const nextStep = (to) => ({ type: STEP_NEXT, to });

export const stepNext = (transition, to) => {
  return (dispatch) => {
    dispatch(nextStep(to));
    transition(to);
  }
};

export const submitApplication = () => {
  return (dispatch, getState, api) => {
    dispatch(preSubmit());
    const payload = getAllFormValues(getState());
    return api(window.location.pathname, {
      method: 'POST',
      body: JSON.stringify({ ...payload })
    })
    .then(() => dispatch(submit(payload)))
    .then(() => dispatch(postSubmit()));
  }
};

export const stepNextPersist = (transition, to) => {
  return (dispatch) => {
    return dispatch(submitApplication())
      .then(() => dispatch(preStep()))
      .then(() => dispatch(nextStep(to)))
      .then(() => transition(to));
  }
};
