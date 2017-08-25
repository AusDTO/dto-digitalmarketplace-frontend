import {
  DATA_IS_LOADING,
  MEMBER_INFO_FETCH_DATA_SUCCESS,
  LOAD_SIGNUP_SUCCESS,
  SIGNUP_SUCCESS,
  CREATE_USER_SUCCESS,
  SET_ERROR_MESSAGE
} from '../constants/constants'

import {
  DUPLICATE_USER,
  USER_NOT_CREATED,
  REGISTRATION_NOT_FOUND,
  GENERAL_ERROR,
  UNABLE_TO_SIGNUP,
  ACCOUNT_TAKEN
} from '../constants/messageConstants'

import dmapi from '../services/apiClient'

export function handleDataLoading(bool) {
  return {
    type: DATA_IS_LOADING,
    isLoading: bool
  }
}

export function handleMemberInfoSuccess(response) {
  return {
    type: MEMBER_INFO_FETCH_DATA_SUCCESS,
    memberInfo: response.data
  }
}

export function memberInfoFetchData() {
  return dispatch => {
    dispatch(handleDataLoading(true))
    dmapi({ url: '/ping' }).then(response => {
      if (response.error) {
        dispatch(setErrorMessage(GENERAL_ERROR))
      } else {
        dispatch(handleMemberInfoSuccess(response))
      }
      dispatch(handleDataLoading(false))
    })
  }
}

export function handleSignupSuccess() {
  return {
    type: SIGNUP_SUCCESS
  }
}

export function handleSignupSubmit(model) {
  return dispatch => {
    dispatch(handleDataLoading(true))
    dmapi({
      url: '/signup',
      method: 'POST',
      data: JSON.stringify(model)
    }).then(response => {
      if (response.error) {
        if (response.status === 409) {
          dispatch(setErrorMessage(ACCOUNT_TAKEN))
        } else {
          dispatch(setErrorMessage(UNABLE_TO_SIGNUP))
        }
      } else {
        dispatch(handleSignupSuccess(response))
      }
      dispatch(handleDataLoading(false))
    })
  }
}

// LOAD USER REGISTRATION DETAILS FOR SIGNUP COMPLETION FORM
export function handleLoadSignupSuccess(response) {
  return {
    type: LOAD_SIGNUP_SUCCESS,
    data: response.data
  }
}

export function loadSignup(token) {
  return dispatch => {
    dispatch(handleDataLoading(true))
    dmapi({ url: `/signup/validate-invite/${token}` }).then(response => {
      if (response.error) {
        dispatch(setErrorMessage(REGISTRATION_NOT_FOUND))
      } else {
        dispatch(handleLoadSignupSuccess(response))
      }
      dispatch(handleDataLoading(false))
    })
  }
}

// PROVIDE PASSWORD AND/OR NAME TO COMPLETE ACCOUNT CREATION
export function handleCreateUserSuccess(response) {
  return {
    type: CREATE_USER_SUCCESS,
    data: response.data
  }
}

export function createUser(values) {
  return dispatch => {
    dispatch(handleDataLoading(true))
    dmapi({
      method: 'post',
      url: '/createuser',
      data: JSON.stringify(values)
    }).then(response => {
      if (response.error) {
        if (response.status === 409) {
          dispatch(setErrorMessage(DUPLICATE_USER))
        } else {
          dispatch(setErrorMessage(USER_NOT_CREATED))
        }
      } else {
        dispatch(handleCreateUserSuccess(response))
      }
      dispatch(handleDataLoading(false))
    })
  }
}

export function setErrorMessage(message) {
  return {
    type: SET_ERROR_MESSAGE,
    message 
  }
}
