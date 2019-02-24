import { actions } from 'react-redux-form'

import { LOAD_SIGNUP_SUCCESS, SIGNUP_SUCCESS, CREATE_USER_SUCCESS } from '../constants/constants'
import {
  DUPLICATE_USER,
  EMAIL_NOT_WHITELISTED,
  USER_NOT_CREATED,
  REGISTRATION_NOT_FOUND,
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

// LOAD USER REGISTRATION DETAILS FOR SIGNUP COMPLETION FORM
export const handleLoadSignupSuccess = response => ({
  type: LOAD_SIGNUP_SUCCESS,
  data: response.data
})

export const loadSignup = token => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: `/signup/validate-invite/${token}` }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(REGISTRATION_NOT_FOUND))
    } else {
      dispatch(actions.load('createUserForm', response.data))
      dispatch(handleLoadSignupSuccess(response))
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
