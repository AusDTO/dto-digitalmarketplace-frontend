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

import { SENDING_REQUEST, SET_ERROR_MESSAGE, SET_AUTH } from '../constants/constants'
import { GENERAL_ERROR, LOGIN_FAILED } from '../constants/messageConstants'
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

export function setAuthState(newState) {
  return { type: SET_AUTH, newState }
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
      dispatch(setAuthState(response.data))
    }
    dispatch(sendingRequest(false))
  })
}
