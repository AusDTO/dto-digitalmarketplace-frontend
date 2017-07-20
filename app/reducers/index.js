import { combineReducers } from 'redux';
import { memberInfo, memberInfoHasErrored, memberInfoIsLoading } from './memberInfoReducers';

export default combineReducers({
    memberInfo,
    memberInfoHasErrored,
    memberInfoIsLoading
});
