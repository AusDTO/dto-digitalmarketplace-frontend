import expect from 'expect'
import reducer from './memberInfoReducers'
import {
  DATA_IS_LOADING,
  MEMBER_INFO_FETCH_DATA_SUCCESS,
  MEMBER_INFO_HAS_ERRORED,
  LOAD_SIGNUP_SUCCESS,
  LOAD_SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_DUPLICATE_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  CREATE_USER_DUPLICATE_FAILURE
} from '../constants/constants'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
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
    })
  })

  it('should handle CREATE_USER_DUPLICATE_FAILURE', () => {
    let action = { type: CREATE_USER_DUPLICATE_FAILURE, errorMessage: 'bad things' }
    let expectedState = {
      createUserErrored: true,
      createUserSuccess: false,
      isDuplicate: true,
      errorMessage: action.errorMessage
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })

  it('should handle CREATE_USER_FAILURE', () => {
    let action = { type: CREATE_USER_FAILURE, errorMessage: 'bad things' }
    let expectedState = {
      createUserErrored: true,
      createUserSuccess: false,
      errorMessage: action.errorMessage
    }

    expect(reducer({}, action)).toEqual(expectedState)
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

  it('should handle SIGNUP_FAILURE', () => {
    let action = { type: SIGNUP_FAILURE, errorMessage: 'Nope' }
    let expectedState = {
      signupSuccess: false,
      signupErrored: true,
      isDuplicate: false,
      errorMessage: action.errorMessage
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })

  it('should handle SIGNUP_DUPLICATE_FAILURE', () => {
    let action = { type: SIGNUP_DUPLICATE_FAILURE, errorMessage: 'Duplicate email address' }
    let expectedState = {
      signupSuccess: false,
      signupErrored: true,
      isDuplicate: true,
      errorMessage: action.errorMessage
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

  it('should handle LOAD_SIGNUP_FAILURE', () => {
    let action = { type: LOAD_SIGNUP_FAILURE, errorMessage: 'Nope' }
    let expectedState = {
      loadSignupErrored: true,
      loadSignupSuccess: false,
      errorMessage: action.errorMessage
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

  it('should handle MEMBER_INFO_HAS_ERRORED', () => {
    let action = {
      type: MEMBER_INFO_HAS_ERRORED,
      errorMessage: 'You should feel bad about this error'
    }
    let expectedState = {
      memberInfoHasErrored: true,
      memberInfoHasSuccess: false,
      errorMessage: action.errorMessage
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })
})
