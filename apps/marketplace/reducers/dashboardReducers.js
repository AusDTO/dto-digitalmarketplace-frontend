import { SET_ERROR_MESSAGE, SELLER_DASHBOARD_SUCCESS } from '../constants/constants'

const defaultUserState = {
  sellerDashboard: { items: [], supplier: {} }
}

const dashboardReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        message: action.message
      }
    case SELLER_DASHBOARD_SUCCESS:
      return {
        ...state,
        sellerDashboard: action.data,
        loadSellerDashboardSuccess: true,
        loadSellerDashboardErrored: false
      }

    default:
      return state
  }
}

export default dashboardReducer
