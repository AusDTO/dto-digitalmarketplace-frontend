import { SELLER_DASHBOARD_SUCCESS, MESSAGE_SUCCESS, TEAM_SUCCESS } from '../constants/sellerDashboard'

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
    case MESSAGE_SUCCESS:
      return {
        ...state,
        sellerDashboard: action.data,
        loadMessageSuccess: true,
        loadMessageErrored: false
      }
    case TEAM_SUCCESS:
      return {
        ...state,
        sellerDashboard: action.data,
        loadTeamSuccess: true,
        loadTeamErrored: false
      }

    default:
      return state
  }
}

export default sellerDashboardReducer
