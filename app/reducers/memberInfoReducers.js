import {
  MEMBER_INFO_HAS_ERRORED,
  DATA_IS_LOADING,
  MEMBER_INFO_FETCH_DATA_SUCCESS,
  LOAD_SIGNUP_SUCCESS,
  LOAD_SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_DUPLICATE_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  CREATE_USER_DUPLICATE_FAILURE
} from '../constants/constants'

let defaultUserState = {
  isLoading: null,
  memberInfoHasSuccess: null,
  memberInfoHasErrored: null,
  memberInfo: { isAutheticated: false },
  loadSignupSuccess: null,
  loadSignupErrored: null,
  signupSuccess: null,
  signupErrored: null,
  userRegisterDetails: null,
  createUserSuccess: null,
  createUserErrored: null,
  errorMessage: null,
  isDuplicate: null,
  user: {}
}

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case DATA_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
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

    case LOAD_SIGNUP_SUCCESS:
      return {
        ...state,
        userRegisterDetails: action.data,
        loadSignupSuccess: true,
        loadSignupErrored: false
      }

    case LOAD_SIGNUP_FAILURE:
      return {
        ...state,
        loadSignupErrored: true,
        loadSignupSuccess: false,
        errorMessage: action.errorMessage
      }

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: true,
        signupErrored: false
      }

    case SIGNUP_DUPLICATE_FAILURE:
      return {
        ...state,
        signupSuccess: false,
        signupErrored: true,
        isDuplicate: true,
        errorMessage: action.errorMessage
      }

    case SIGNUP_FAILURE:
      return {
        ...state,
        signupSuccess: false,
        signupErrored: true,
        isDuplicate: false,
        errorMessage: action.errorMessage
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
