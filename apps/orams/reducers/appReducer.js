/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import { SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/constants'

// The initial application state
const initialState = {
  currentlySending: false,
  errorMessage: null
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SENDING_REQUEST:
      return {
        ...state,
        currentlySending: action.sending
      }

    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    default:
      return state
  }
}

export default appReducer
