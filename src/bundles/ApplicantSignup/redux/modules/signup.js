import { flattenStateForms } from '../helpers';
import { actions } from 'react-redux-form';

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

export const preSubmit = () => ({ type: APP_PRE_SUBMIT });
export const postSubmit = () => ({ type: APP_POST_SUBMIT });
export const submit = (payload = {}) => ({ type: APP_SUBMIT, payload });

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
    const state = getState();
    const { form_options = {} } = state;
    const application = flattenStateForms(state);

    const payload = {
      application
    };

    return api(window.location.pathname, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        // Flask expects the token as a header.
        'X-CSRFToken': form_options.csrf_token
      }
    })
    .then(() => dispatch(submit(payload)))
    .then(() => dispatch(postSubmit()));
  }
};

export const stepNextPersist = (transition, to, step) => {
  return (dispatch) => {
    return dispatch(submitApplication())
      .then(() => dispatch(preStep()))
      .then(() => dispatch(actions.setSubmitted(step.formKey)))
      .then(() => dispatch(nextStep(to)))
      .then(() => transition(to));
  }
};


const constants = {
  STEP_NEXT,
  STEP_PRE,
  APP_SUBMIT,
  APP_POST_SUBMIT,
  APP_PRE_SUBMIT
};

const actionCreators = {
  preSubmit,
  postSubmit,
  submit,
  preStep,
  nextStep,
  stepNext,
  stepNextPersist,
  submitApplication
};

export {
  constants,
  actionCreators as actions
}