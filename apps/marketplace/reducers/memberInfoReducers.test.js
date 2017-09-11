import expect from 'expect'
import reducer from './memberInfoReducers'
import { LOAD_SIGNUP_SUCCESS, SIGNUP_SUCCESS, CREATE_USER_SUCCESS } from '../constants/constants'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loadSignupSuccess: null,
      signupSuccess: null,
      userRegisterDetails: null,
      createUserSuccess: null,
      resetPasswordEmailSuccess: null,
      resetPasswordSuccess: null,
      user: {}
    })
  })

  it('should handle CREATE_USER_SUCCESS', () => {
    const action = { type: CREATE_USER_SUCCESS, data: { things: 'yes' } }
    const expectedState = {
      user: action.data,
      createUserSuccess: true,
      createUserErrored: false
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })

  it('should handle SIGNUP_SUCCESS', () => {
    const action = { type: SIGNUP_SUCCESS }
    const expectedState = {
      signupSuccess: true,
      signupErrored: false
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })

  it('should handle LOAD_SIGNUP_SUCCESS', () => {
    const action = {
      type: LOAD_SIGNUP_SUCCESS,
      data: { name: 'Jeff Labowski', email_address: 'e@mail.com', user_type: 'buyer' }
    }
    const expectedState = {
      userRegisterDetails: action.data,
      loadSignupSuccess: true,
      loadSignupErrored: false
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })

  it('should handle LOAD_SIGNUP_SUCCESS', () => {
    const action = {
      type: LOAD_SIGNUP_SUCCESS,
      data: { name: 'Jeff Labowski', email_address: 'e@mail.com', user_type: 'buyer' }
    }
    const expectedState = {
      userRegisterDetails: action.data,
      loadSignupSuccess: true,
      loadSignupErrored: false
    }

    expect(reducer({}, action)).toEqual(expectedState)
  })
})
