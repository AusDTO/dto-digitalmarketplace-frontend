import {
  GET_RESET_DATA_SUCCESS,
  RESET_PASSWORD_EMAIL_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  GET_RESET_DATA_FAILURE
} from '../constants/constants'

import { GENERAL_ERROR, UNABLE_TO_RESET, UNABLE_TO_SEND } from '../constants/messageConstants'

import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const handleResetPasswordSuccess = () => ({ type: RESET_PASSWORD_EMAIL_SUCCESS })

export const sendResetPasswordEmail = values => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({
    method: 'post',
    url: `/reset-password/framework/${values.framework}`,
    data: JSON.stringify(values)
  }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(UNABLE_TO_SEND))
    } else {
      dispatch(handleResetPasswordSuccess())
    }
    dispatch(sendingRequest(false))
  })
}

export const handleGetResetDataSuccess = response => ({
  type: GET_RESET_DATA_SUCCESS,
  user: response.data
})

export const handleGetResetFailure = () => ({ type: GET_RESET_DATA_FAILURE })

export const getUserDataFromToken = token => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: `/reset-password/${token}` }).then(response => {
    if (response.error) {
      if (response.data && response.data.message) {
        dispatch(setErrorMessage(`${response.data.message}. Try resending reset password email.`))
      } else {
        dispatch(setErrorMessage(GENERAL_ERROR))
      }
      dispatch(handleGetResetFailure())
    } else {
      dispatch(handleGetResetDataSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const handleSubmitResetPasswordSuccess = response => ({
  type: RESET_PASSWORD_SUCCESS,
  user: response.data
})

export const submitResetPassword = values => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({
    method: 'post',
    url: `/reset-password/${values.token}`,
    data: JSON.stringify(values)
  }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(UNABLE_TO_RESET))
    } else {
      dispatch(handleSubmitResetPasswordSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}
