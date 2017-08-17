import expect from 'expect'
import reducer from './memberInfoReducers'
import {
  MEMBER_INFO_IS_LOADING,
  MEMBER_INFO_FETCH_DATA_SUCCESS,
  MEMBER_INFO_HAS_ERRORED,
  LOAD_COMPLETE_SIGNUP_LOADING,
  LOAD_COMPLETE_SIGNUP_SUCCESS,
  LOAD_COMPLETE_SIGNUP_FAILURE,
  CREATE_USER_LOADING,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  CREATE_USER_DUPLICATE_FAILURE
} from '../constants/constants'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
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

  it('should handle CREATE_USER_LOADING', () => {
    let action = { type: CREATE_USER_LOADING, createUserLoading: false }
    let expectedState = {
      createUserLoading: action.createUserLoading
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })

  it('should handle LOAD_COMPLETE_SIGNUP_FAILURE', () => {
    let action = { type: LOAD_COMPLETE_SIGNUP_FAILURE }
    let expectedState = {
      loadCompleteSignupErrored: true,
      loadCompleteSignupSuccess: false
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })

  it('should handle LOAD_COMPLETE_SIGNUP_SUCCESS', () => {
    let action = {
      type: LOAD_COMPLETE_SIGNUP_SUCCESS,
      data: { name: 'Jeff Labowski', email_address: 'e@mail.com', user_type: 'buyer' }
    }
    let expectedState = {
      userRegisterDetails: action.data,
      loadCompleteSignupSuccess: true,
      loadCompleteSignupErrored: false
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })

  it('should handle MEMBER_INFO_IS_LOADING', () => {
    let action = { type: MEMBER_INFO_IS_LOADING, isLoading: true }
    let expectedState = { memberInfoIsLoading: true }

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

  it('should handle LOAD_COMPLETE_SIGNUP_LOADING', () => {
    let action = {
      type: LOAD_COMPLETE_SIGNUP_LOADING,
      loadCompleteSignupLoading: true
    }
    let expectedState = {
      loadCompleteSignupLoading: true
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })
})
