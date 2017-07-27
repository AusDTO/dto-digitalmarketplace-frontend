import { 
	MEMBER_INFO_HAS_ERRORED, 
	MEMBER_INFO_IS_LOADING, 
	MEMBER_INFO_FETCH_DATA_SUCCESS 
} from '../constants/constants';

import apiFetch from '../services/apiFetch'

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


export function memberInfoFetchData() {
    return (dispatch) => {

        apiFetch('/api/ping')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(memberInfoIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((memberInfo) => dispatch(memberInfoFetchDataSuccess(memberInfo)))
            .catch(() => dispatch(memberInfoHasErrored(true)));
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