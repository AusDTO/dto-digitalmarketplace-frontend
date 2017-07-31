import expect from 'expect';
import { memberInfoFetchData, memberInfoFetchDataSuccess } from './memberActions';
import { 
  MEMBER_INFO_HAS_ERRORED, 
  MEMBER_INFO_IS_LOADING, 
  MEMBER_INFO_FETCH_DATA_SUCCESS
} from '../constants/constants';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// Test a sync action
describe('Member Actions', () => {
  describe('memberInfoFetchDataSuccess', () => {
    it('should create a MEMBER_INFO_FETCH_DATA_SUCCESS action', () => {
      // arrange
      const memberInfo = {
        csrfToken: '153d1b83ad20d5c4e681e0109c35d2fee7eaa5bdc4725140115587c245094cfd',
        isAuthenticated: true,
        userType: 'buyer'
      };
      const expectedAction = {
        type: MEMBER_INFO_FETCH_DATA_SUCCESS,
        memberInfo: memberInfo
      };

      //act
      const action = memberInfoFetchDataSuccess(memberInfo);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});