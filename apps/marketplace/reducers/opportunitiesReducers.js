import { OPPORTUNITIES_SUCCESS, OPPORTUNITIES_SENDING, OPPORTUNITIES_SET_PAGE } from '../constants/constants'

const defaultState = {
  opportunities: [],
  currentPage: 1,
  currentlySending: false
}

const opportunitiesReducers = (state = defaultState, action) => {
  switch (action.type) {
    case OPPORTUNITIES_SUCCESS:
      return {
        ...state,
        opportunities: action.opportunities
      }

    case OPPORTUNITIES_SET_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
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
