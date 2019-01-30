import { SELLER_DASHBOARD_SUCCESS, MESSAGES_SUCCESS, TEAM_SUCCESS } from '../constants/sellerDashboard'

const defaultUserState = {
  supplier: {},
  messages: { items: [] },
  team: { items: [] }
}

const sellerDashboardReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case SELLER_DASHBOARD_SUCCESS:
      return {
        ...state,
        ...action.data,
        loadSellerDashboardSuccess: true,
        loadSellerDashboardErrored: false
      }
    case MESSAGES_SUCCESS:
      return {
        ...state,
        messages: {
          items: action.data.items
        },
        loadMessageSuccess: true,
        loadMessageErrored: false
      }
    case TEAM_SUCCESS:
      return {
        ...state,
        team: {
          items: action.data.items
        },
        loadTeamSuccess: true,
        loadTeamErrored: false
      }

    default:
      return state
  }
}

export default sellerDashboardReducer
