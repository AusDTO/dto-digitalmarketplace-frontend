import {
  MEMBER_INFO_HAS_ERRORED,
  MEMBER_INFO_IS_LOADING,
  MEMBER_INFO_FETCH_DATA_SUCCESS,
  LOAD_COMPLETE_SIGNUP_LOADING,
  LOAD_COMPLETE_SIGNUP_SUCCESS,
  LOAD_COMPLETE_SIGNUP_FAILURE,
  CREATE_USER_LOADING,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  CREATE_USER_DUPLICATE_FAILURE
} from '../constants/constants'

import axios from 'axios'

export function memberInfoIsLoading(bool) {
  return {
    type: MEMBER_INFO_IS_LOADING,
    isLoading: bool
  }
}

export function handleMemberInfoResponse(response) {
  switch (response.status) {
    case 200:
      return {
        type: MEMBER_INFO_FETCH_DATA_SUCCESS,
        data: response.data
      }

    default:
      return {
        type: MEMBER_INFO_HAS_ERRORED,
        errorMessage: response.data.message
      }
  }
}

export function memberInfoFetchData() {
  return dispatch => {
    dispatch(memberInfoIsLoading(true))
    axios({ url: '/api/ping', withCredentials: true })
      .then(response => {
        if (response) {
          dispatch(handleMemberInfoResponse(response))
          dispatch(memberInfoIsLoading(false))
        }
      })
      .catch(error => {
        if (error.response) {
          dispatch(handleMemberInfoResponse(error.response))
          dispatch(memberInfoIsLoading(false))
        }
      })
  }
}

// LOAD USER REGISTRATION DETAILS FOR SIGNUP COMPLETION FORM
export function loadCompleteSignupLoading(bool) {
  return {
    type: LOAD_COMPLETE_SIGNUP_LOADING,
    loadCompleteSignupLoading: bool
  }
}

export function handleLoadCompleteSignupResponse(response) {
  switch (response.status) {
    case 200:
      return {
        type: LOAD_COMPLETE_SIGNUP_SUCCESS,
        data: response.data
      }

    default:
      return {
        type: LOAD_COMPLETE_SIGNUP_FAILURE,
        errorMessage: response.data.message
      }
  }
}

export function loadCompleteSignup(token) {
  return dispatch => {
    dispatch(loadCompleteSignupLoading(true))
    axios({ url: `/api/signup/validate-invite/${token}`, withCredentials: true })
      .then(response => {
        if (response) {
          dispatch(loadCompleteSignupLoading(false))
          dispatch(handleLoadCompleteSignupResponse(response))
        }
      })
      .catch(error => {
        if (error.response) {
          dispatch(handleLoadCompleteSignupResponse())
          dispatch(loadCompleteSignupLoading(false))
        }
      })
  }
}

// PROVIDE PASSWORD AND/OR NAME TO COMPLETE ACCOUNT CREATION
export function createUserInitiate(bool) {
  return {
    type: CREATE_USER_LOADING,
    createUserLoading: bool
  }
}

export function handleCreateUserResponse(response) {
  switch (response.status) {
    case 200:
      return {
        type: CREATE_USER_SUCCESS,
        data: response.data
      }

    case 409:
      return {
        type: CREATE_USER_DUPLICATE_FAILURE,
        errorMessage: response.data.message
      }

    case 400:
      return {
        type: CREATE_USER_FAILURE,
        errorMessage: response.data.message
      }

    case 500:
      return {
        type: CREATE_USER_FAILURE,
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
    dispatch(createUserInitiate(true))
    axios({
      method: 'post',
      url: '/api/signup/createuser',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(values),
      withCredentials: true,
      credentials: 'same-origin'
    })
      .then(response => {
        if (response) {
          dispatch(handleCreateUserResponse(response))
          dispatch(createUserInitiate(false))
        }
      })
      .catch(error => {
        if (error.response) {
          dispatch(handleCreateUserResponse(error.response))
          dispatch(createUserInitiate(false))
        }
      })
  }
}
