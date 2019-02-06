import {
  SELLER_DASHBOARD_SUCCESS,
  SELLER_DASHBOARD_MESSAGES_LOAD,
  SELLER_DASHBOARD_TEAM_LOAD,
  SELLER_DASHBOARD_SERVICES_LOAD
} from '../constants/constants'

const defaultUserState = {
  supplier: {},
  messages: { items: [], loading: false, errors: false },
  team: { items: [], loading: false, errors: false },
  services: { items: [], loading: false, errors: false }
}

const sellerDashboardReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case SELLER_DASHBOARD_SUCCESS:
      return {
        ...state,
        ...action.data
      }
    case SELLER_DASHBOARD_MESSAGES_LOAD:
    return {
      ...state,
      messages: action.data
    }
    case SELLER_DASHBOARD_SERVICES_LOAD:
      return {
        ...state,
        services: action.data
      }
    case SELLER_DASHBOARD_TEAM_LOAD:
      return {
        ...state,
        team: action.data
      }

    default:
      return state
  }
}

export default sellerDashboardReducer
