import {
  MEMBER_INFO_HAS_ERRORED,
  MEMBER_INFO_IS_LOADING,
  MEMBER_INFO_FETCH_DATA_SUCCESS,
  DECODE_USER_INVITE_TOKEN_SUCCESS,
  DECODE_USER_INVITE_TOKEN_FAILURE
} from '../constants/constants'

export function memberInfoHasErrored(state = false, action) {
  switch (action.type) {
    case MEMBER_INFO_HAS_ERRORED:
      return action.hasErrored

    default:
      return state
  }
}

export function memberInfoIsLoading(state = false, action) {
  switch (action.type) {
    case MEMBER_INFO_IS_LOADING:
      return action.isLoading

    default:
      return state
  }
}

export function memberInfo(state = {}, action) {
  switch (action.type) {
    case MEMBER_INFO_FETCH_DATA_SUCCESS:
      return action.memberInfo

    default:
      return state
  }
}

let defaultCreateUserState = {
  registrationDataLoaded: false,
  memberInfoHasErrored: null
}

export function createUser(state = defaultCreateUserState, action) {
  switch (action.type) {
    case DECODE_USER_INVITE_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        userRegisterDetails: action.data,
        registrationDataLoaded: true
      })

    case DECODE_USER_INVITE_TOKEN_FAILURE:
      return Object.assign({}, state, {
        memberInfoHasErrored: true
      })

    default:
      return state
  }
}
