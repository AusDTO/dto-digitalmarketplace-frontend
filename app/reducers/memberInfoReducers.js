import {
  DATA_IS_LOADING,
  MEMBER_INFO_FETCH_DATA_SUCCESS,
  LOAD_SIGNUP_SUCCESS,
  SIGNUP_SUCCESS,
  CREATE_USER_SUCCESS
} from '../constants/constants'

const defaultUserState = {
  isLoading: null,
  memberInfoHasSuccess: null,
  memberInfo: { isAutheticated: false },
  loadSignupSuccess: null,
  signupSuccess: null,
  userRegisterDetails: null,
  createUserSuccess: null,
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

    default:
      return state
  }
}

export default userReducer
