import expect from 'expect'
import { handleMemberInfoResponse } from './memberActions'
import { MEMBER_INFO_FETCH_DATA_SUCCESS, MEMBER_INFO_HAS_ERRORED } from '../constants/constants'

// import thunk from 'redux-thunk'
// import nock from 'nock'
// import configureMockStore from 'redux-mock-store'

// Test a sync action
describe('Member Actions', () => {
  describe('memberInfoFetchDataSuccess', () => {
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
  })
})

describe('Member Actions', () => {
  describe('memberInfoFetchDataError', () => {
    it('should create a MEMBER_INFO_FETCH_DATA_SUCCESS action', () => {
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
})
