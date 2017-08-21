import expect from 'expect'
import {
  handleMemberInfoSuccess,
  handleMemberInfoFailure,
  handleSignupSuccess,
  handleSignupFailure,
  handleLoadSignupSuccess,
  handleLoadSignupFailure,
  handleCreateUserSuccess,
  handleCreateUserFailure
} from './memberActions'
import {
  MEMBER_INFO_FETCH_DATA_SUCCESS,
  MEMBER_INFO_HAS_ERRORED,
  LOAD_SIGNUP_SUCCESS,
  LOAD_SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_DUPLICATE_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER_DUPLICATE_FAILURE,
  CREATE_USER_FAILURE
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

      //act
      const action = handleMemberInfoSuccess(memberInfoResponse)

      //assert
      expect(action).toEqual(expectedAction)
      expect(action.memberInfo.userType).toEqual('buyer')
    })

    it('should create a MEMBER_INFO_HAS_ERRORED action', () => {
      // arrange
      const memberInfoResponse = {
        status: 500,
        data: {
          message: 'Something bad happened on the server and request to ping failed'
        }
      }
      const expectedAction = {
        type: MEMBER_INFO_HAS_ERRORED,
        errorMessage: memberInfoResponse.data.message
      }

      //act
      const action = handleMemberInfoFailure(memberInfoResponse)

      //assert
      expect(action).toEqual(expectedAction)
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

      //act
      const action = handleSignupSuccess(submitSignupResponse)

      //assert
      expect(action).toEqual(expectedAction)
    })

    it('should create a SIGNUP_FAILURE action', () => {
      // arrange
      const submitSignupResponse = {
        status: 400,
        data: {
          message: 'Error occured during signup api request'
        }
      }
      const expectedAction = {
        type: SIGNUP_FAILURE,
        errorMessage: submitSignupResponse.data.message
      }

      //act
      const action = handleSignupFailure(submitSignupResponse)

      //assert
      expect(action).toEqual(expectedAction)
    })

    it('should create a SIGNUP_DUPLICATE_FAILURE action', () => {
      // arrange
      const submitSignupResponse = {
        status: 409,
        data: {
          message: 'You tried to signup for an account with a duplicate email address'
        }
      }
      const expectedAction = {
        type: SIGNUP_DUPLICATE_FAILURE,
        errorMessage: submitSignupResponse.data.message
      }

      //act
      const action = handleSignupFailure(submitSignupResponse)

      //assert
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

      //act
      const action = handleLoadSignupSuccess(loadSignupResponse)

      //assert
      expect(action).toEqual(expectedAction)
    })

    it('should create a LOAD_SIGNUP_FAILURE action', () => {
      // arrange
      const loadSignupResponse = {
        status: 400,
        data: {
          message: 'Error occured during complete signup api request'
        }
      }
      const expectedAction = {
        type: LOAD_SIGNUP_FAILURE,
        errorMessage: loadSignupResponse.data.message
      }

      //act
      const action = handleLoadSignupFailure(loadSignupResponse)

      //assert
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

      //act
      const action = handleCreateUserSuccess(createUserResponse)

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
      const action = handleCreateUserFailure(createUserResponse)

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
      const action = handleCreateUserFailure(createUserResponse)

      //assert
      expect(action).toEqual(expectedAction)
    })
  })
})
