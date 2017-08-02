import {
  MEMBER_INFO_HAS_ERRORED,
  MEMBER_INFO_IS_LOADING,
  MEMBER_INFO_FETCH_DATA_SUCCESS,
  DECODE_USER_INVITE_TOKEN_SUCCESS,
  DECODE_USER_INVITE_TOKEN_FAILURE
} from '../constants/constants'

import apiFetch from '../services/apiFetch'

export function memberInfoHasErrored(bool) {
  return {
    type: MEMBER_INFO_HAS_ERRORED,
    hasErrored: bool
  }
}

export function memberInfoIsLoading(bool) {
  return {
    type: MEMBER_INFO_IS_LOADING,
    isLoading: bool
  }
}

export function memberInfoFetchDataSuccess(memberInfo) {
  return {
    type: MEMBER_INFO_FETCH_DATA_SUCCESS,
    memberInfo
  }
}

export function decodeInviteTokenSuccess(data) {
  return {
    type: DECODE_USER_INVITE_TOKEN_SUCCESS,
    data
  }
}

export function decodeInviteTokenFailure(bool) {
  return {
    type: DECODE_USER_INVITE_TOKEN_FAILURE,
    memberInfoHasErrored: bool
  }
}

export function memberInfoFetchData() {
  return dispatch => {
    dispatch(memberInfoIsLoading(true))
    apiFetch('/api/ping')
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(memberInfoIsLoading(false))

        return response
      })
      .then(response => response.json())
      .then(memberInfo => dispatch(memberInfoFetchDataSuccess(memberInfo)))
      .catch(() => dispatch(memberInfoHasErrored(true)))
  }
}

export function decodeInviteToken(token) {
  return dispatch => {
    dispatch(memberInfoIsLoading(true))
    apiFetch(`/api/signup/create-user/${token}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(memberInfoIsLoading(false))

        return response
      })
      .then(response => response.json())
      .then(data => dispatch(decodeInviteTokenSuccess(data)))
      .catch(() => dispatch(decodeInviteTokenFailure(true)))
  }
}
