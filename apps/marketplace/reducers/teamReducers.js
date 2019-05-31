import { CREATE_TEAM_SUCCESS } from '../constants/constants'

const defaultState = {
  team: {}
}

const teamReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_TEAM_SUCCESS:
      return {
        ...state,
        team: action.team
      }
    default:
      return state
  }
}

export default teamReducer
