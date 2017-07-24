import { 
	MEMBER_INFO_HAS_ERRORED, 
	MEMBER_INFO_IS_LOADING, 
	MEMBER_INFO_FETCH_DATA_SUCCESS 
} from '../constants/constants';

import api from '../services/api';

export function setAuthState(newState) {
  return { type: SET_AUTH, newState };
}

export function memberInfoHasErrored(bool) {
    return {
        type: 'MEMBER_INFO_HAS_ERRORED',
        hasErrored: bool
    };
}

export function memberInfoIsLoading(bool) {
    return {
        type: 'MEMBER_INFO_IS_LOADING',
        isLoading: bool
    };
}

export function memberInfoFetchDataSuccess(memberInfo) {
    return {
        type: 'MEMBER_INFO_FETCH_DATA_SUCCESS',
        memberInfo
    };
}

export function memberInfoFetchData(cookie) {
    return (dispatch) => {
        dispatch(memberInfoIsLoading(true))

        api.fetchMemberInfo(cookie)
	        .then((response) => {

	            dispatch(memberInfoIsLoading(false))
	            
	            return response.response
	        })
	        .then((response) => response)
	        .then((memberInfo) => dispatch(memberInfoFetchDataSuccess(memberInfo)))
	        .catch(() => dispatch(memberInfoHasErrored(true)))
  	}
}

export function logoutUserAction() {
  return (dispatch) => {
    api.logoutMember()
        .then((response) => {
            return response.response
            
        })
        .catch(() => dispatch(memberInfoHasErrored(true)))
  }
}