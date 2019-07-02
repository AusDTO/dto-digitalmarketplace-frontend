import {
  BUYER_TEAM_MEMBERS_SUCCESS,
  CREATE_TEAM_SUCCESS,
  GET_TEAM_SUCCESS,
  SAVE_TEAM_SUCCESS,
  SET_ERROR_MESSAGE,
  USER_ORGANISATION
} from '../constants/constants'

export const TeamFormReducer = {
  emailAddress: '',
  id: 0,
  name: '',
  status: '',
  teamLeads: {},
  teamMembers: {}
}

const defaultState = {
  buyerTeamMembers: { items: [] },
  organisation: '',
  team: TeamFormReducer
}

const teamReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_TEAM_SUCCESS:
      return {
        ...state,
        team: { ...action.team }
      }
    case GET_TEAM_SUCCESS:
      return {
        ...state,
        team: { ...action.team }
      }
    case SAVE_TEAM_SUCCESS:
      return {
        ...state,
        team: { ...action.team }
      }
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
