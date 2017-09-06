import expect from 'expect'
import {
  handleMemberInfoSuccess,
  handleSignupSuccess,
  handleLoadSignupSuccess,
  handleCreateUserSuccess
} from './memberActions'
import {
  MEMBER_INFO_FETCH_DATA_SUCCESS,
  LOAD_SIGNUP_SUCCESS,
  SIGNUP_SUCCESS,
  CREATE_USER_SUCCESS
} from '../constants/constants'

// Test a sync action
describe('Member Actions', () => {
  describe('first api call for csrf token, authentication, and user type info', () => {
    it('should create a MEMBER_INFO_FETCH_DATA_SUCCESS action', () => {
      // arrange
      const memberInfoResponse = {
        status: 200,
        data: {
          csrfToken: '153d1b83ad20d5c4e681e0109c35d2fee7eaa5bdc4725140115587c245094cfd',
          isAuthenticated: true,
          userType: 'buyer'
        }
      }
      const expectedAction = {
        type: MEMBER_INFO_FETCH_DATA_SUCCESS,
        memberInfo: memberInfoResponse.data
      }

      // act
      const action = handleMemberInfoSuccess(memberInfoResponse)

      // assert
      expect(action).toEqual(expectedAction)
      expect(action.memberInfo.userType).toEqual('buyer')
    })
  })

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

  describe('loading data to poplulate password entry form to complete new use creation', () => {
    it('should create a MEMBER_INFO_FETCH_DATA_SUCCESS action', () => {
      // arrange
      const loadSignupResponse = {
        status: 200,
        data: {
          name: 'Jeffrey Labowski',
          email: 'the@dude.com'
        }
      }
      const expectedAction = {
        type: LOAD_SIGNUP_SUCCESS,
        data: loadSignupResponse.data
      }

      // act
      const action = handleLoadSignupSuccess(loadSignupResponse)

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
