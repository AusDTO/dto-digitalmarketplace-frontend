import {
  SELLER_DASHBOARD_SUCCESS,
  SELLER_DASHBOARD_MESSAGES_SUCCESS,
  SELLER_DASHBOARD_TEAM_SUCCESS,
  SELLER_DASHBOARD_SERVICES_SUCCESS
} from '../constants/constants'

const defaultUserState = {
  supplier: {},
  messages: { items: [] },
  team: { items: [] },
  services: { items: [] }
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
    case SELLER_DASHBOARD_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: {
          items: action.data.messages.items
        },
        loadMessageSuccess: true,
        loadMessageErrored: false
      }
    case SELLER_DASHBOARD_SERVICES_SUCCESS:
      return {
        ...state,
        services: {
          items: action.data.services.items
        },
        loadServicesSuccess: true,
        loadServicesErrored: false
      }
    case SELLER_DASHBOARD_TEAM_SUCCESS:
      return {
        ...state,
        team: {
          items: action.data.teams.items
        },
        loadTeamSuccess: true,
        loadTeamErrored: false
      }

    default:
      return state
  }
}

export default sellerDashboardReducer
