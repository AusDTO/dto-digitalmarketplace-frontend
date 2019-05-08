import defer from 'lodash/defer';
import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';
import {flattenStateForms, dispatchFormState, getStateForms, focusHeading} from '../helpers';
import {actions as stepActions}    from '../../redux/modules/steps';

const STEP_NEXT = 'step/next';
const STEP_PRE = 'step/pre';
const APP_SUBMIT = 'application/submit';
const APP_PRE_SUBMIT = 'application/pre-submit';
const APP_POST_SUBMIT = 'application/post-submit';
const APP_SAVED = 'application/saved';
const APP_ERROR = 'application/error';
const LINK_CLICK = 'link/click';
const CONFIRM_DISCARD = 'application/confirm-discard';

const statusCheck = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

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
    case CONFIRM_DISCARD:
      return Object.assign({}, state, {confirmDiscard: action.show});
    default:
      return state;
  }
};

export const preSubmit = () => ({type: APP_PRE_SUBMIT});
export const postSubmit = () => ({type: APP_POST_SUBMIT});
export const submit = (payload = {}) => ({type: APP_SUBMIT, payload});
export const saveApplication = () => ({type: APP_SAVED});
export const errorApplication = () => ({type: APP_ERROR});
export const confirmDiscard = (show) => ({type: CONFIRM_DISCARD, show});

export const preStep = () => ({type: STEP_PRE});
export const nextStep = (to) => ({type: STEP_NEXT, to});

export const submitApplication = () => {
  return (dispatch, getState, {api, router}) => {
    dispatch(preSubmit());

    const state = getState();
    const {form_options = {}, steps} = state;
    let application = flattenStateForms(state);

    if (steps) {
      application = Object.assign({}, application, {steps});
    }

    const payload = {
      application
    };

    return api(form_options.action, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        // Flask expects the token as a header.
        'X-CSRFToken': form_options.csrf_token,
        'Content-Type': 'application/json'
      }
    })
      .then(statusCheck)
      .then((response) => response.json())
      // Update application in the state to match the server.
      .then((persistedModel) => {
        state.application_errors = [];
        dispatch(submit(persistedModel))
        return persistedModel;
      })
      // Disperse the data back into the redux store's form models, keeping everything in sync.
      .then((model) => dispatchFormState(dispatch, getStateForms(state), model.application))
      .then(() => dispatch(postSubmit()));
  }
};

// when a user skips services as a product only seller, then goes back and adds a service, set case study completion
// to incomplete
export const validateCompletionStatus = (state, dispatch) => {
  if (some(Object.values(state.domainSelectorForm.services)) && isEmpty(state.caseStudyForm.case_studies)) {
    //dispatch(stepActions.stepClear('casestudy'))
  }

  if (!some(Object.values(state.domainSelectorForm.services)) && isEmpty(state.productsForm.products)) {
    dispatch(stepActions.stepClear('products'))
  }
};

export const navigateToStep = (to) => {
  return (dispatch, getState, {router}) => {
    const state = getState();
    validateCompletionStatus(state, dispatch);
    dispatch(preStep());
    dispatch(nextStep(to));
    router.push(to);
    focusHeading();
  }
};

export const stepNextPersist = (to, step) => {
  return (dispatch, getState, {router}) => {
    return dispatch(submitApplication())
      .then(() => dispatch(preStep()))
      .then(() => dispatch(nextStep(to)))
      .then(() => router.push(to))
      .then(() => focusHeading())
      .catch((e) => {
        console.error(`Error: ${e.message}`, e);
        dispatch(errorApplication());
      });
  }
};

export const linkClick = (to) => {
  return (dispatch) => {
    dispatch(preStep());
    dispatch({type: LINK_CLICK, to});
    defer(focusHeading);
  }
}

export const push = (to) => {
  return (dispatch, getState, {router}) => {
    router.push(to);
    dispatch(linkClick(to));
  }
};

export const uploadDocument = (id, file) => {
  return (dispatch, getState, {api}) => {
    const state = getState();
    const {form_options = {}} = state;

    let data = new FormData()
    data.append(id, file)

    return api(`${form_options.document_url}${id}`, {
      method: 'POST',
      body: data,
      headers: {
        'X-CSRFToken': form_options.csrf_token,
      }
    })
      .then(statusCheck)
      .then(r => r.text())
  }
};

export const showConfirmDiscard = (show) => {
  return (dispatch) => {
    dispatch(confirmDiscard(show));
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
  saveApplication,
  errorApplication,
  preStep,
  nextStep,
  stepNextPersist,
  submitApplication,
  navigateToStep,
  uploadDocument,
  linkClick,
  push
};

export {
  constants,
  actionCreators as actions
}
