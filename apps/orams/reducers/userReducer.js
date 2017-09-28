import {
  GET_RESET_DATA_SUCCESS,
  GET_RESET_DATA_FAILURE,
  RESET_PASSWORD_EMAIL_SUCCESS,
  RESET_PASSWORD_SUCCESS
} from '../constants/constants'

const defaultUserState = {
  userRegisterDetails: null,
  resetPasswordEmailSuccess: null,
  resetPasswordSuccess: null,
  errorMessage: null,
  user: {}
}

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
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
