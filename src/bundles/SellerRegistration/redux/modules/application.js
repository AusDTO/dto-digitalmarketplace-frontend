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

export const submitApplication = () => {
    return (dispatch, getState, api) => {
        dispatch(preSubmit());
        const state = getState();
        const { form_options = {}, steps } = state;
        let application = flattenStateForms(state);

        if (steps) {
            application = Object.assign({}, application, { steps });
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
            .then(() => dispatch(submit(payload)))
            .then(() => dispatch(postSubmit()));
    }
};

export const stepNextPersist = (transition, to, step) => {
    return (dispatch) => {
        return dispatch(submitApplication())
            .then(() => dispatch(preStep()))
            .then(() => dispatch(actions.setSubmitted(step.formKey)))
            .then(() => dispatch(actions.setPristine(step.formKey)))
            .then(() => dispatch(nextStep(to)))
            .then(() => transition(to))
            .then(() => {
                // Not the greatest thing, but since we're not mutating anything
                // in the DOM and just managing focus, I think we're okay.
                // findDOMNode doesn't break the lines of encapsulation.
                if (typeof document !== 'undefined') {
                    document.querySelector('h1').focus()
                }
            });
    }
};

export const uploadDocument = (id, file) => {
    return (dispatch, getState, api) => {
        const state = getState();
        const { form_options = {} } = state;

        let data = new FormData()
        data.append(id, file)

        return api(`${form_options.document_url}${id}`, {
          method: 'POST',
          body: data,
          headers: {
            'X-CSRFToken': form_options.csrf_token,
          }
        }).then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response
          } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
          }
        }).then(r => r.text())
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
    stepNextPersist,
    submitApplication
};

export {
    constants,
    actionCreators as actions
}