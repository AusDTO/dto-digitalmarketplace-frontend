import {
  BUYER_TEAM_MEMBERS_SUCCESS,
  SET_ERROR_MESSAGE,
  TEAMS_OVERVIEW_SUCCESS,
  USER_ORGANISATION
} from '../constants/constants'

const defaultState = {
  buyerTeamMembers: { items: [] },
  organisation: '',
  teamsOverview: {
    teams: {}
  }
}

const teamsDashboardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case BUYER_TEAM_MEMBERS_SUCCESS:
      return {
        ...state,
        buyerTeamMembers: action.data,
        loadBuyerTeamMembersErrored: false
      }
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        message: action.message
      }
    case TEAMS_OVERVIEW_SUCCESS:
      return {
        ...state,
        teamsOverview: {
          loadedAt: new Date().valueOf(),
          teams: action.data
        }
      }
    case USER_ORGANISATION:
      return {
        ...state,
        organisation: action.data
      }
    default:
      return state
  }
}

export default teamsDashboardReducer
