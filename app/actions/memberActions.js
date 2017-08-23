import {
  DATA_IS_LOADING,
  MEMBER_INFO_FETCH_DATA_SUCCESS,
  MEMBER_INFO_HAS_ERRORED,
  LOAD_SIGNUP_SUCCESS,
  LOAD_SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_DUPLICATE_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  CREATE_USER_DUPLICATE_FAILURE
} from '../constants/constants'

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

export function handleMemberInfoFailure(response) {
  return {
    type: MEMBER_INFO_HAS_ERRORED,
    // eslint-disable-next-line
    errorMessage: response.data ? response.data.message : 'unknown server error'
  }
}

export function memberInfoFetchData() {
  return dispatch => {
    dispatch(handleDataLoading(true))
    dmapi({ url: '/ping' }).then(response => {
      if (response.error) {
        dispatch(handleMemberInfoFailure(response))
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

export function handleSignupFailure(response) {
  switch (response.status) {
    case 409:
      return {
        type: SIGNUP_DUPLICATE_FAILURE,
        // eslint-disable-next-line
        errorMessage: response.data ? response.data.message : 'a user with this email address already exists'
      }

    default:
      return {
        type: SIGNUP_FAILURE,
        // eslint-disable-next-line
        errorMessage: response.data ? response.data.message : 'unknown server error'
      }
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
        dispatch(handleSignupFailure(response))
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

export function handleLoadSignupFailure(response) {
  return {
    type: LOAD_SIGNUP_FAILURE,
    // eslint-disable-next-line
    errorMessage: response.data ? response.data.message : 'unknown server error'
  }
}

export function loadSignup(token) {
  return dispatch => {
    dispatch(handleDataLoading(true))
    dmapi({ url: `/signup/validate-invite/${token}` }).then(response => {
      if (response.error) {
        dispatch(handleLoadSignupFailure(response))
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

export function handleCreateUserFailure(response) {
  switch (response.status) {
    case 409:
      return {
        type: CREATE_USER_DUPLICATE_FAILURE,
        errorMessage: response.data.message
      }

    default:
      return {
        type: CREATE_USER_FAILURE,
        errorMessage: response.data.message
      }
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
        dispatch(handleCreateUserFailure(response))
      } else {
        dispatch(handleCreateUserSuccess(response))
      }
      dispatch(handleDataLoading(false))
    })
  }
}
