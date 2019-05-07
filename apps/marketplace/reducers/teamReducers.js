import { BUYER_TEAM_MEMBERS_SUCCESS, USER_ORGANISATION } from '../constants/constants'

const defaultUserState = {
  buyerTeamMembers: { items: [] },
  organisation: ''
}

const teamReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case BUYER_TEAM_MEMBERS_SUCCESS:
      return {
        ...state,
        buyerTeamMembers: action.data,
        loadBuyerTeamMembersErrored: false
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
