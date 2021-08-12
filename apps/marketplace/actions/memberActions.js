import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_ABN,
  CREATE_USER_SUCCESS,
  SEND_INVITE_SUCCESS
} from '../constants/constants'
import { USER_NOT_CREATED, INVITE_NOT_SENT } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const setSignupErrorCode = errorCode => ({ type: SIGNUP_ERROR, errorCode })

export const setSignupABN = signupABN => ({ type: SIGNUP_ABN, signupABN })

export const handleSignupSuccess = () => ({ type: SIGNUP_SUCCESS })

export const handleSignupSubmit = model => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: '/signup',
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(model)
  }).then(response => {
    if (response.error) {
      if (response.data && response.data.message) {
        dispatch(setErrorMessage(response.data.message))
      } else if (response.data.abn) {
        dispatch(setSignupABN(response.data.abn))
      } else {
        dispatch(setSignupErrorCode(response.status))
      }
    } else {
      dispatch(handleSignupSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

// PROVIDE PASSWORD AND/OR NAME TO COMPLETE ACCOUNT CREATION
export const handleCreateUserSuccess = response => ({
  type: CREATE_USER_SUCCESS,
  data: response.data
})

export const createUser = (token, emailAddress, password) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  dmapi({
    method: 'post',
    url: `/create-user/${token}`,
    params: { e: encodeURIComponent(emailAddress) },
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: { password }
  }).then(response => {
    if (response.error) {
      if (response.data && response.data.message) {
        dispatch(setErrorMessage(response.data.message))
      } else {
        dispatch(setErrorMessage(USER_NOT_CREATED))
      }
    } else {
      dispatch(handleCreateUserSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const handleSendInviteSuccess = response => ({
  type: SEND_INVITE_SUCCESS,
  data: response.data
})

export const sendInvite = (token, emailAddress) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  dmapi({
    method: 'post',
    url: `/send-invite/${token}`,
    params: { e: encodeURIComponent(emailAddress) },
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.error) {
      if (response.data && response.data.message) {
        dispatch(setErrorMessage(response.data.message))
      } else {
        dispatch(setErrorMessage(INVITE_NOT_SENT))
      }
    } else {
      dispatch(handleSendInviteSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}
