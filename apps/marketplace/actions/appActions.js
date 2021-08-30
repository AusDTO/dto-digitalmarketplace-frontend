/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return function(dispatch) {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        }
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

import {
  SENDING_REQUEST,
  SET_ERROR_MESSAGE,
  CLEAR_ERROR_MESSAGES,
  SET_AUTH,
  FEEDBACK_SUCCESS,
  SET_AUTH_FRAMEWORK_ERROR
} from '../constants/constants'
import { GENERAL_ERROR, INVALID_CSRF, LOGIN_FAILED } from '../constants/messageConstants'
import dmapi from '../services/apiClient'

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export const sendingRequest = sending => ({ type: SENDING_REQUEST, sending })

export const setErrorMessage = errorMessage => ({
  type: SET_ERROR_MESSAGE,
  errorMessage
})

export const clearErrorMessages = () => ({ type: CLEAR_ERROR_MESSAGES })

export function setAuthState(newState) {
  return { type: SET_AUTH, newState }
}

export function setAuthFrameworkError(frameworkError) {
  return { type: SET_AUTH_FRAMEWORK_ERROR, frameworkError }
}

export const fetchAuth = () => dispatch => {
  dispatch(sendingRequest(true))
  dispatch(setAuthFrameworkError(false))
  dmapi({ url: '/ping' }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      if (response.data.framework && response.data.framework !== 'digital-marketplace') {
        dispatch(setAuthFrameworkError(true))
      }
      dispatch(setAuthState(response.data))
    }
    dispatch(sendingRequest(false))
  })
}

export const login = data => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  dispatch(setAuthFrameworkError(false))
  dmapi({
    method: 'post',
    url: '/login',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  }).then(response => {
    if (response.error) {
      if (response.data && response.data.message && response.data.message.toLowerCase().includes('invalid csrf')) {
        dispatch(setAuthState({ csrfToken: '' }))
        dispatch(setErrorMessage(INVALID_CSRF))
      } else {
        dispatch(setErrorMessage(LOGIN_FAILED))
      }
    } else {
      dispatch(clearErrorMessages())
      if (response.data.framework && response.data.framework !== 'digital-marketplace') {
        dispatch(setAuthFrameworkError(true))
      }
      dispatch(setAuthState(response.data))
    }
    dispatch(sendingRequest(false))
  })
}

export const logout = () => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: '/logout' }).then(() => {
    dispatch(clearErrorMessages())
    dispatch(setAuthState({ isAuthenticated: false, userType: '', csrfToken: '' }))
    dispatch(sendingRequest(false))
  })
}

export const handleErrorFailure = response => dispatch => {
  let error = GENERAL_ERROR

  if (response && response.data) {
    if (response.data.errorMessage) {
      error = response.data.errorMessage
    }

    if (response.data.message) {
      error = response.data.message
    }
  }

  dispatch(setErrorMessage(error))
}

export const handleFeedbackSuccess = () => ({ type: FEEDBACK_SUCCESS })

export const handleFeedbackSubmit = feedback => (dispatch, getState) => {
  dmapi({
    url: `/feedback`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(feedback)
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else if (feedback.allowFurtherFeedback === undefined) {
      dispatch(handleFeedbackSuccess(response))
    }
  })
}
