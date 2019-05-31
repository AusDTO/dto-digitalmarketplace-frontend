import {
  SET_ERROR_MESSAGE,
  BUYER_DASHBOARD_MYBRIEFS_SUCCESS,
  BUYER_DASHBOARD_TEAMBRIEFS_SUCCESS,
  BUYER_DASHBOARD_TEAMOVERVIEW_SUCCESS,
  BUYER_DASHBOARD_ORGANISATION
} from '../constants/constants'

const defaultUserState = {
  buyerDashboard: { items: [] },
  buyerDashboardMyBriefs: { items: [] },
  buyerDashboardTeamBriefs: { items: [] },
  buyerDashboardTeamOverview: { items: [] },
  buyerDashboardOrganisation: ''
}

const dashboardReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        message: action.message
      }
    case BUYER_DASHBOARD_MYBRIEFS_SUCCESS:
      return {
        ...state,
        buyerDashboardMyBriefs: action.data,
        loadBuyerDashboardMyBriefsSuccess: true,
        loadBuyerDashboardMyBriefsErrored: false
      }
    case BUYER_DASHBOARD_TEAMBRIEFS_SUCCESS:
      return {
        ...state,
        buyerDashboardTeamBriefs: action.data,
        loadBuyerDashboardTeamBriefsSuccess: true,
        loadBuyerDashboardTeamBriefsErrored: false
      }
    case BUYER_DASHBOARD_TEAMOVERVIEW_SUCCESS:
      return {
        ...state,
        buyerDashboardTeamOverview: action.data,
        loadBuyerDashboardTeamOverviewSuccess: true,
        loadBuyerDashboardTeamOverviewErrored: false
      }
    case BUYER_DASHBOARD_ORGANISATION:
      return {
        ...state,
        buyerDashboardOrganisation: action.data
      }

    default:
      return state
  }
}

export default dashboardReducer
