import {
  SELLER_DASHBOARD_SUCCESS,
  SELLER_DASHBOARD_MESSAGES_LOAD,
  SELLER_DASHBOARD_CATEGORIES_LOAD,
  SELLER_DASHBOARD_TEAM_LOAD
} from '../constants/constants'

const defaultUserState = {
  supplier: { supplier: null, loading: false, errors: false, loadedAt: null },
  messages: { items: [], loading: false, errors: false, loadedAt: null },
  team: { items: [], loading: false, errors: false, loadedAt: null },
  categories: { items: [], loading: false, errors: false, loadedAt: null }
}

const sellerDashboardReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case SELLER_DASHBOARD_SUCCESS:
      return {
        ...state,
        supplier: action.data
      }
    case SELLER_DASHBOARD_MESSAGES_LOAD:
      return {
        ...state,
        messages: action.data
      }
    case SELLER_DASHBOARD_CATEGORIES_LOAD:
      return {
        ...state,
        categories: action.data
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
