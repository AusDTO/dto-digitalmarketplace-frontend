import { combineReducers } from 'redux';
import { memberInfo, memberInfoHasErrored, memberInfoIsLoading } from './memberInfoReducers';
import form_options from './form_options'
import { createForms } from 'react-redux-form';

export default combineReducers({
    memberInfo,
    memberInfoHasErrored,
    memberInfoIsLoading,
    form_options,
    ...createForms({
	    signupForm: {}
	})
});
