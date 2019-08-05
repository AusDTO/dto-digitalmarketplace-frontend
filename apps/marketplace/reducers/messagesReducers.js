import { MESSAGES_SUCCESS, MESSAGES_SENDING } from '../constants/constants'

const defaultState = {
  data: null,
  currentlySending: false
}

const messagesReducers = (state = defaultState, action) => {
  switch (action.type) {
    case MESSAGES_SUCCESS:
      return {
        ...state,
        data: action.data
      }
    case MESSAGES_SENDING:
      return {
        ...state,
        currentlySending: action.currentlySending
      }
    default:
      return state
  }
}

export default messagesReducers
