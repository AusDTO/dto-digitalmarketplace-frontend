import { USER_ORGANISATION } from '../constants/constants'

const defaultUserState = {
  organisation: ''
}

const teamReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case USER_ORGANISATION:
      return {
        ...state,
        organisation: action.data
      }
    default:
      return state
  }
}

export default teamReducer
