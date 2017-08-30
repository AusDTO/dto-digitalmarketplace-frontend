import {
  DATA_IS_LOADING,
  MEMBER_INFO_FETCH_DATA_SUCCESS,
  LOAD_SIGNUP_SUCCESS,
  SIGNUP_SUCCESS,
  CREATE_USER_SUCCESS,
  SET_ERROR_MESSAGE,
  GET_RESET_DATA_SUCCESS,
  GET_RESET_DATA_FAILURE,
  RESET_PASSWORD_EMAIL_FAILURE,
  RESET_PASSWORD_EMAIL_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE
} from '../constants/constants'

let defaultUserState = {
  isLoading: null,
  memberInfoHasSuccess: null,
  memberInfo: { isAutheticated: false },
  loadSignupSuccess: null,
  signupSuccess: null,
  userRegisterDetails: null,
  createUserSuccess: null,
  resetPasswordEmailSuccess: null,
  resetPasswordEmailFailure: null,
  resetPasswordSuccess: null,
  resetPasswordFailure: null,
  errorMessage: null,
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

    case LOAD_SIGNUP_SUCCESS:
      return {
        ...state,
        userRegisterDetails: action.data,
        loadSignupSuccess: true,
        loadSignupErrored: false
      }

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: true,
        signupErrored: false
      }

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.data,
        createUserSuccess: true,
        createUserErrored: false
      }

    case SET_ERROR_MESSAGE:
      return {
        ...state,
        message: action.message
      }

    case GET_RESET_DATA_SUCCESS:
      return {
        ...state,
        user: Object.assign({}, state.user, action.user),
        getResetDataSuccess: true,
        errorMessage: false
      }

    case GET_RESET_DATA_FAILURE:
      return {
        ...state,
        getResetDataSuccess: false,
        errorMessage: action.errorMessage
      }

    case RESET_PASSWORD_EMAIL_SUCCESS:
      return {
        ...state,
        resetPasswordEmailSuccess: true,
        resetPasswordEmailFailure: false,
        errorMessage: false
      }

    case RESET_PASSWORD_EMAIL_FAILURE:
      return {
        ...state,
        resetPasswordEmailSuccess: false,
        resetPasswordEmailFailure: true,
        errorMessage: action.errorMessage
      }

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        user: Object.assign({}, state.user, action.user),
        resetPasswordSuccess: true,
        errorMessage: false
      }

    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPasswordSuccess: false,
        errorMessage: action.errorMessage
      }

    default:
      return state
  }
}

export default userReducer
