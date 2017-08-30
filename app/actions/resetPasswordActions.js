import {
  GET_RESET_DATA_SUCCESS,
  GET_RESET_DATA_FAILURE,
  RESET_PASSWORD_EMAIL_FAILURE,
  RESET_PASSWORD_EMAIL_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS
} from '../constants/constants'

import { handleDataLoading } from './commonActions'

import dmapi from '../services/apiClient'

export function handleResetPasswordSuccess() {
  return {
    type: RESET_PASSWORD_EMAIL_SUCCESS
  }
}

export function handleResetPasswordFailure(response) {
  return {
    type: RESET_PASSWORD_EMAIL_FAILURE,
    errorMessage: response.data.message
  }
}

export function sendResetPasswordEmail(values) {
  return dispatch => {
    dispatch(handleDataLoading(true))
    dmapi({
      method: 'post',
      url: '/reset-password/',
      data: JSON.stringify(values)
    })
      .then(response => {
        return response
      })
      .then(response => {
        if (response.error) {
          dispatch(handleResetPasswordFailure(response))
        } else {
          dispatch(handleResetPasswordSuccess())
        }
        dispatch(handleDataLoading(false))
      })
  }
}

export function handleGetResetDataSuccess(response) {
  return {
    type: GET_RESET_DATA_SUCCESS,
    user: response.data
  }
}

export function handleGetResetDataFailure(response) {
  return {
    type: GET_RESET_DATA_FAILURE,
    errorMessage: response.data.message
  }
}

export function getUserDataFromToken(token) {
  return dispatch => {
    dispatch(handleDataLoading(true))
    dmapi({ url: `/reset-password/${token}` }).then(response => {
      if (response.error) {
        dispatch(handleGetResetDataFailure(response))
      } else {
        dispatch(handleGetResetDataSuccess(response))
      }
      dispatch(handleDataLoading(false))
    })
  }
}

export function handleSubmitResetPasswordSuccess(response) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    user: response.data
  }
}

export function handleSubmitResetPasswordFailure(response) {
  return {
    type: RESET_PASSWORD_FAILURE,
    errorMessage: response.data.message
  }
}

export function submitResetPassword(values) {
  return dispatch => {
    dispatch(handleDataLoading(true))
    dmapi({
      method: 'post',
      url: `/reset-password/${values.token}`,
      data: JSON.stringify(values)
    }).then(response => {
      if (response.error) {
        dispatch(handleSubmitResetPasswordFailure(response))
      } else {
        dispatch(handleSubmitResetPasswordSuccess(response))
      }
      dispatch(handleDataLoading(false))
    })
  }
}
