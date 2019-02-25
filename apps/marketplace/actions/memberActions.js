import { SIGNUP_SUCCESS, CREATE_USER_SUCCESS, SEND_INVITE_SUCCESS } from '../constants/constants'
import {
  DUPLICATE_USER,
  EMAIL_NOT_WHITELISTED,
  USER_NOT_CREATED,
  INVITE_NOT_SENT,
  ACCOUNT_TAKEN,
  GENERAL_ERROR
} from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const handleSignupSuccess = () => ({ type: SIGNUP_SUCCESS })

export const handleSignupSubmit = model => (dispatch, getState) => {
  const getErrorMessage = status =>
    ({
      403: EMAIL_NOT_WHITELISTED,
      409: ACCOUNT_TAKEN,
      default: GENERAL_ERROR
    }[status])

  dispatch(sendingRequest(true))
  dmapi({
    url: '/signup',
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(model)
  }).then(response => {
    if (response.error) {
      const errorMessage = getErrorMessage(response.status) || getErrorMessage('default')
      dispatch(setErrorMessage(errorMessage))
    } else {
      dispatch(handleSignupSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

// PROVIDE PASSWORD AND/OR NAME TO COMPLETE ACCOUNT CREATION
export const handleCreateUserSuccess = response => ({
  type: CREATE_USER_SUCCESS,
  data: response.data
})

export const createUser = (tokenString, emailAddress, password) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  dmapi({
    method: 'post',
    url: `/create-user/${tokenString}`,
    params: { e: encodeURIComponent(emailAddress) },
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: { password }
  }).then(response => {
    if (response.error) {
      if (response.status === 409) {
        dispatch(setErrorMessage(DUPLICATE_USER))
      } else if (response.data && response.data.message) {
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

export const sendInvite = (tokenString, emailAddress) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  dmapi({
    method: 'post',
    url: `/send-invite/${tokenString}`,
    params: { e: encodeURIComponent(emailAddress) },
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(INVITE_NOT_SENT))
    } else {
      dispatch(handleSendInviteSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}
