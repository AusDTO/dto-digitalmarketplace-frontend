import expect from 'expect'
import reducer from './memberInfoReducers'
import {
  DATA_IS_LOADING,
  MEMBER_INFO_FETCH_DATA_SUCCESS,
  LOAD_SIGNUP_SUCCESS,
  SIGNUP_SUCCESS,
  CREATE_USER_SUCCESS
} from '../constants/constants'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
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
    })
  })

  it('should handle CREATE_USER_SUCCESS', () => {
    let action = { type: CREATE_USER_SUCCESS, data: { things: 'yes' } }
    let expectedState = {
      user: action.data,
      createUserSuccess: true,
      createUserErrored: false
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })

  it('should handle DATA_IS_LOADING', () => {
    let action = { type: DATA_IS_LOADING, isLoading: false }
    let expectedState = {
      isLoading: action.isLoading
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })

  it('should handle SIGNUP_SUCCESS', () => {
    let action = { type: SIGNUP_SUCCESS }
    let expectedState = {
      signupSuccess: true,
      signupErrored: false
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })

  it('should handle LOAD_SIGNUP_SUCCESS', () => {
    let action = {
      type: LOAD_SIGNUP_SUCCESS,
      data: { name: 'Jeff Labowski', email_address: 'e@mail.com', user_type: 'buyer' }
    }
    let expectedState = {
      userRegisterDetails: action.data,
      loadSignupSuccess: true,
      loadSignupErrored: false
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })

  it('should handle LOAD_SIGNUP_SUCCESS', () => {
    let action = {
      type: LOAD_SIGNUP_SUCCESS,
      data: { name: 'Jeff Labowski', email_address: 'e@mail.com', user_type: 'buyer' }
    }
    let expectedState = {
      userRegisterDetails: action.data,
      loadSignupSuccess: true,
      loadSignupErrored: false
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })

  it('should handle MEMBER_INFO_FETCH_DATA_SUCCESS', () => {
    let action = {
      type: MEMBER_INFO_FETCH_DATA_SUCCESS,
      memberInfo: { name: 'Jeff Labowski', email_address: 'e@mail.com' }
    }
    let expectedState = {
      memberInfo: action.memberInfo,
      memberInfoHasSuccess: true,
      memberInfoHasErrored: false
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })
})
