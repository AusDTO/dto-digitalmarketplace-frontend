import { CREATE_TEAM_SUCCESS, GET_TEAM_SUCCESS, SAVE_TEAM_SUCCESS } from '../constants/constants'

const defaultState = {
  emailAddress: '',
  id: 0,
  name: '',
  status: '',
  teamLeads: {},
  teamLeadsToRemove: []
}

const teamReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_TEAM_SUCCESS:
      return {
        ...state,
        team: action.team
      }
    case GET_TEAM_SUCCESS:
      return {
        ...state,
        ...action.team
      }
    case SAVE_TEAM_SUCCESS:
      return {
        ...state,
        ...action.team
      }
    default:
      return state
  }
}

export default teamReducer
