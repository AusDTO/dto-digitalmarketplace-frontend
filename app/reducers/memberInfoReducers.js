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

let defaultUserState = {
  memberInfoIsLoading: null,
  memberInfoHasSuccess: null,
  memberInfoHasErrored: null,
  memberInfo: { isAutheticated: false },
  loadCompleteSignupLoading: null,
  loadCompleteSignupSuccess: null,
  loadCompleteSignupErrored: null,
  userRegisterDetails: null,
  createUserLoading: null,
  createUserSuccess: null,
  createUserErrored: null,
  errorMessage: null,
  isDuplicate: null,
  user: {}
}

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case MEMBER_INFO_IS_LOADING:
      return {
        ...state,
        memberInfoIsLoading: action.isLoading
      }

    case MEMBER_INFO_FETCH_DATA_SUCCESS:
      return {
        ...state,
        memberInfo: action.memberInfo,
        memberInfoHasSuccess: true,
        memberInfoHasErrored: false
      }

    case MEMBER_INFO_HAS_ERRORED:
      return {
        ...state,
        memberInfoHasErrored: true,
        memberInfoHasSuccess: false,
        errorMessage: action.errorMessage
      }

    case LOAD_COMPLETE_SIGNUP_LOADING:
      return {
        ...state,
        loadCompleteSignupLoading: action.loadCompleteSignupLoading
      }

    case LOAD_COMPLETE_SIGNUP_SUCCESS:
      return {
        ...state,
        userRegisterDetails: action.data,
        loadCompleteSignupSuccess: true,
        loadCompleteSignupErrored: false
      }

    case LOAD_COMPLETE_SIGNUP_FAILURE:
      return {
        ...state,
        loadCompleteSignupErrored: true,
        loadCompleteSignupSuccess: false
      }

    case CREATE_USER_LOADING:
      return {
        ...state,
        createUserLoading: action.createUserLoading
      }

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.data,
        createUserSuccess: true,
        createUserErrored: false
      }

    case CREATE_USER_FAILURE:
      return {
        ...state,
        createUserErrored: true,
        createUserSuccess: false,
        errorMessage: action.errorMessage
      }

    case CREATE_USER_DUPLICATE_FAILURE:
      return {
        ...state,
        createUserErrored: true,
        createUserSuccess: false,
        isDuplicate: true,
        errorMessage: action.errorMessage
      }

    default:
      return state
  }
}

export default userReducer
