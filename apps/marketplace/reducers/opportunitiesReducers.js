import { OPPORTUNITIES_SUCCESS, OPPORTUNITIES_SENDING } from '../constants/constants'

const defaultState = {
  opportunities: [],
  currentlySending: false
}

const opportunitiesReducers = (state = defaultState, action) => {
  switch (action.type) {
    case OPPORTUNITIES_SUCCESS:
      return {
        ...state,
        opportunities: action.opportunities
      }

    case OPPORTUNITIES_SENDING:
      return {
        ...state,
        currentlySending: action.currentlySending
      }

    default:
      return state
  }
}

export default opportunitiesReducers
