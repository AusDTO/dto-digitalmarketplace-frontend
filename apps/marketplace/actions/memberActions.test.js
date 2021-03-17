import expect from 'expect'
import { handleSignupSuccess, handleCreateUserSuccess } from './memberActions'
import { SIGNUP_SUCCESS, CREATE_USER_SUCCESS } from '../constants/constants'

jest.mock('../../shared/Icon/_getIcons')
// Test a sync action
describe('Member Actions', () => {
  describe('Signup new user form submit', () => {
    it('should create a MEMBER_INFO_FETCH_DATA_SUCCESS action', () => {
      // arrange
      const submitSignupResponse = {
        status: 200,
        data: {
          name: 'Jeffrey Labowski',
          email: 'the@dude.com'
        }
      }
      const expectedAction = {
        type: SIGNUP_SUCCESS
      }

      // act
      const action = handleSignupSuccess(submitSignupResponse)

      // assert
      expect(action).toEqual(expectedAction)
    })
  })

  describe('create new user form', () => {
    it('should create a CREATE_USER_SUCCESS action', () => {
      // arrange
      const createUserResponse = {
        status: 200,
        data: {
          name: 'Jeffrey Labowski',
          email: 'the@dude.com',
          user_type: 'seller'
        }
      }
      const expectedAction = {
        type: CREATE_USER_SUCCESS,
        data: createUserResponse.data
      }

      // act
      const action = handleCreateUserSuccess(createUserResponse)

      // assert
      expect(action).toEqual(expectedAction)
    })
  })
})
