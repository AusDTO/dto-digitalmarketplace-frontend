import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_ABN,
  CREATE_USER_SUCCESS,
  SEND_INVITE_SUCCESS,
  SET_ERROR_MESSAGE,
  GET_RESET_DATA_SUCCESS,
  GET_RESET_DATA_FAILURE,
  RESET_PASSWORD_EMAIL_INITIAL,
  RESET_PASSWORD_EMAIL_SUCCESS,
  RESET_PASSWORD_SUCCESS
} from '../constants/constants'

const defaultUserState = {
  signupSuccess: null,
  userRegisterDetails: null,
  createUserSuccess: null,
  sendInviteSuccess: null,
  resetPasswordEmailSuccess: null,
  resetPasswordSuccess: null,
  user: {}
}

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: true,
        signupErrored: false
      }

    case SIGNUP_ERROR:
      return {
        ...state,
        signupErrorCode: action.errorCode
      }

    case SIGNUP_ABN:
      return {
        ...state,
        signupABN: action.signupABN
      }

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.data,
        createUserSuccess: true,
        createUserErrored: false
      }

    case SEND_INVITE_SUCCESS:
      return {
        ...state,
        user: action.data,
        sendInviteSuccess: true
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
        resetPasswordSuccess: false
      }

    case RESET_PASSWORD_EMAIL_INITIAL:
      return {
        ...state,
        resetPasswordEmailSuccess: false,
        errorMessage: false
      }

    case RESET_PASSWORD_EMAIL_SUCCESS:
      return {
        ...state,
        resetPasswordEmailSuccess: true,
        errorMessage: false
      }

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        user: Object.assign({}, state.user, action.user),
        resetPasswordSuccess: true,
        errorMessage: false
      }

    default:
      return state
  }
}

export default userReducer
