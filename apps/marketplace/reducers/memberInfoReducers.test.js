import expect from 'expect'
import reducer from './memberInfoReducers'
import { SIGNUP_SUCCESS, CREATE_USER_SUCCESS } from '../constants/constants'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      signupSuccess: null,
      userRegisterDetails: null,
      createUserSuccess: null,
      sendInviteSuccess: null,
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
})
