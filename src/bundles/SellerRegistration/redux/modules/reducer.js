import { combineReducers } from 'redux'
import { combineForms } from 'react-redux-form';

import yourinfo from './yourinfo';
import errorMessage from './errorMessage';

export default combineReducers({
  yourinfo,
  form_options: (state = { }) => state,
  form: combineForms({
    yourInfo: {}
  }, 'form'),
  errorMessage,
})
