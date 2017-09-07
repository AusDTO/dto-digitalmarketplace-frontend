/* eslint-disable camelcase */
import { combineReducers } from 'redux'
import { createForms } from 'react-redux-form'

import appReducer from './appReducer'

export default combineReducers({
  app: appReducer,
})
