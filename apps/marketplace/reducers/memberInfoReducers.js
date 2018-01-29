import {
  LOAD_SIGNUP_SUCCESS,
  SIGNUP_SUCCESS,
  CREATE_USER_SUCCESS,
  SET_ERROR_MESSAGE,
  GET_RESET_DATA_SUCCESS,
  GET_RESET_DATA_FAILURE,
  RESET_PASSWORD_EMAIL_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  SELLER_DASHBOARD_SUCCESS
} from '../constants/constants'

const defaultUserState = {
  loadSignupSuccess: null,
  signupSuccess: null,
  userRegisterDetails: null,
  createUserSuccess: null,
  resetPasswordEmailSuccess: null,
  resetPasswordSuccess: null,
  user: {},
  sellerDashboard: { items: [] }
}

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
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

    case SELLER_DASHBOARD_SUCCESS:
      return {
        ...state,
        sellerDashboard: action.data,
        loadSellerDashboardSuccess: true,
        loadSellerDashboardErrored: false
      }

    default:
      return state
  }
}

export default userReducer
