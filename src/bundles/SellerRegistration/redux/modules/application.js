import { flattenStateForms, dispatchFormState, getStateForms } from '../helpers';

const STEP_NEXT = 'step/next';
const STEP_PRE = 'step/pre';
const APP_SUBMIT = 'application/submit';
const APP_PRE_SUBMIT = 'application/pre-submit';
const APP_POST_SUBMIT = 'application/post-submit';

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
    const { type, payload } = action;
    switch (type) {
        case APP_SUBMIT:
            return Object.assign({}, state, payload.application);
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
        .then(statusCheck)
        .then((response) => response.json())
        // Update application in the state to match the server.
        .then((persistedModel) => {
            dispatch(submit(persistedModel))
            return persistedModel;
        })
        // Disperse the data back into the redux store's form models, keeping everything in sync. 
        .then((model) => dispatchFormState(dispatch, getStateForms(state), model.application))
        .then(() => dispatch(postSubmit()))
        .catch((e) => {
            console.error(`Error: ${e.message}`, e);
        });
    }
};

export const stepNextPersist = (transition, to, step) => {
    return (dispatch) => {
        return dispatch(submitApplication())
            .then(() => dispatch(preStep()))
            .then(() => dispatch(nextStep(to)))
            .then(() => transition(to))
            .then(() => {
                // Not the greatest thing, but since we're not mutating anything
                // in the DOM and just managing focus, I think we're okay.
                // findDOMNode doesn't break the lines of encapsulation.
                if (typeof document !== 'undefined') {
                    const heading = document.querySelector('h1');
                    return heading && heading.focus();
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
        })
        .then(statusCheck)
        .then(r => r.text())
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