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
  SET_AUTH,
  CLEAR_ERROR_MESSAGES,
  DISPLAY_STEP_2
} from 'orams/constants/constants'
import { LOGIN_FAILED, GENERAL_ERROR } from 'orams/constants/messageConstants'
import dmapi from 'orams/services/apiClient'

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

export function displaySignupStepTwo() {
  return { type: DISPLAY_STEP_2 }
}

export const fetchAuth = () => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: '/ping' }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(setAuthState(response.data))
    }
    dispatch(sendingRequest(false))
  })
}

export const login = data => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({
    method: 'post',
    url: '/login',
    data: JSON.stringify(data)
  }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(LOGIN_FAILED))
    } else {
      dispatch(clearErrorMessages())
      dispatch(setAuthState(response.data))
    }
    dispatch(sendingRequest(false))
  })
}

export const logout = () => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: '/logout' }).then(() => {
    dispatch(clearErrorMessages())
    dispatch(setAuthState({ isAuthenticated: false, userType: '' }))
    dispatch(sendingRequest(false))
  })
}

export const signup = data => dispatch => {
  const body = {
    email_address: data.emailAddress,
    framework: 'orams',
    user_type: 'buyer',
    name: data.name
  }

  dispatch(sendingRequest(true))
  dmapi({
    method: 'post',
    url: '/signup',
    data: JSON.stringify(body)
  }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(clearErrorMessages())
      dispatch(displaySignupStepTwo())
    }
    dispatch(sendingRequest(false))
  })
}
