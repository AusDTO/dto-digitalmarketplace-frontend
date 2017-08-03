/*
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import { 
	MEMBER_INFO_HAS_ERRORED, 
	MEMBER_INFO_IS_LOADING, 
	MEMBER_INFO_FETCH_DATA_SUCCESS 
} from '../constants/constants'

export function memberInfoHasErrored(state = false, action) {
  switch (action.type) {
  case MEMBER_INFO_HAS_ERRORED:
    return action.hasErrored

  default:
    return state
  }
}

export function memberInfoIsLoading(state = false, action) {
  switch (action.type) {
  case MEMBER_INFO_IS_LOADING:
    return action.isLoading

  default:
    return state
  }
}

export function memberInfo(state = {}, action) {
  switch (action.type) {
  case MEMBER_INFO_FETCH_DATA_SUCCESS:
    return action.memberInfo

  default:
    return state
  }
}
