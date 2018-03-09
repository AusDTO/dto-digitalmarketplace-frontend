import { SET_ERROR_MESSAGE, SELLER_DASHBOARD_SUCCESS, BUYER_DASHBOARD_SUCCESS, BUYER_DASHBOARD_MYBRIEFS_SUCCESS } from '../constants/constants'

const defaultUserState = {
  sellerDashboard: { items: [], supplier: {} },
  buyerDashboard: { items: [] },
  buyerDashboardMyBriefs: { items: [] },
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
    case BUYER_DASHBOARD_SUCCESS:
      return {
        ...state,
        buyerDashboard: action.data,
        loadBuyerDashboardSuccess: true,
        loadBuyerDashboardErrored: false
      }

    default:
      return state
  }
}

export default dashboardReducer
