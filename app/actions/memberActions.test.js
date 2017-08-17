import expect from 'expect'
import { handleMemberInfoResponse, handleLoadCompleteSignupResponse, handleCreateUserResponse } from './memberActions'
import {
  MEMBER_INFO_FETCH_DATA_SUCCESS,
  MEMBER_INFO_HAS_ERRORED,
  LOAD_COMPLETE_SIGNUP_SUCCESS,
  LOAD_COMPLETE_SIGNUP_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER_DUPLICATE_FAILURE,
  CREATE_USER_FAILURE
} from '../constants/constants'

// Test a sync action
describe('Member Actions', () => {
  describe('memberInfoFetchData', () => {
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

      //act
      const action = handleMemberInfoResponse(memberInfoResponse)

      //assert
      expect(action).toEqual(expectedAction)
      expect(action.memberInfo.userType).toEqual('buyer')
    })

    it('should create a MEMBER_INFO_HAS_ERRORED action', () => {
      // arrange
      const memberInfoResponse = {
        status: 409,
        data: {
          message: 'A user with this email address already exists'
        }
      }
      const expectedAction = {
        type: MEMBER_INFO_HAS_ERRORED,
        errorMessage: memberInfoResponse.data.message
      }

      //act
      const action = handleMemberInfoResponse(memberInfoResponse)

      //assert
      expect(action).toEqual(expectedAction)
    })
  })

  describe('loadCompleteSignup', () => {
    it('should create a MEMBER_INFO_FETCH_DATA_SUCCESS action', () => {
      // arrange
      const completeSignupResponse = {
        status: 200,
        data: {
          name: 'Jeffrey Labowski',
          email: 'the@dude.com'
        }
      }
      const expectedAction = {
        type: LOAD_COMPLETE_SIGNUP_SUCCESS,
        data: completeSignupResponse.data
      }

      //act
      const action = handleLoadCompleteSignupResponse(completeSignupResponse)

      //assert
      expect(action).toEqual(expectedAction)
    })

    it('should create a LOAD_COMPLETE_SIGNUP_FAILURE action', () => {
      // arrange
      const completeSignupResponse = {
        status: 400,
        data: {
          message: 'Error occured during complete signup api request'
        }
      }
      const expectedAction = {
        type: LOAD_COMPLETE_SIGNUP_FAILURE,
        errorMessage: completeSignupResponse.data.message
      }

      //act
      const action = handleLoadCompleteSignupResponse(completeSignupResponse)

      //assert
      expect(action).toEqual(expectedAction)
    })
  })

  describe('createUsre', () => {
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

      //act
      const action = handleCreateUserResponse(createUserResponse)

      //assert
      expect(action).toEqual(expectedAction)
    })

    it('should create a CREATE_USER_DUPLICATE_FAILURE action', () => {
      // arrange
      const createUserResponse = {
        status: 409,
        data: {
          message: 'Duplicate user error message'
        }
      }
      const expectedAction = {
        type: CREATE_USER_DUPLICATE_FAILURE,
        errorMessage: createUserResponse.data.message
      }

      //act
      const action = handleCreateUserResponse(createUserResponse)

      //assert
      expect(action).toEqual(expectedAction)
    })

    it('should create a CREATE_USER_FAILURE action', () => {
      // arrange
      const createUserResponse = {
        status: 400,
        data: {
          message: 'Other user error message'
        }
      }
      const expectedAction = {
        type: CREATE_USER_FAILURE,
        errorMessage: createUserResponse.data.message
      }

      //act
      const action = handleCreateUserResponse(createUserResponse)

      //assert
      expect(action).toEqual(expectedAction)
    })
  })
})
