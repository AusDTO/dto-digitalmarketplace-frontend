import { BUYER_TEAM_MEMBERS_SUCCESS, SET_ERROR_MESSAGE, USER_ORGANISATION } from '../constants/constants'

const defaultState = {
  buyerTeamMembers: { items: [] },
  organisation: ''
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
