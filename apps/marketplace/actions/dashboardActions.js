import {
  BUYER_DASHBOARD_ORGANISATION,
  BUYER_DASHBOARD_MYBRIEFS_SUCCESS,
  BUYER_DASHBOARD_TEAMBRIEFS_SUCCESS,
  BUYER_DASHBOARD_TEAMOVERVIEW_SUCCESS
} from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const handleBuyerDashboardSuccess = (type, response) => ({
  type,
  data: response.data
})

export const handleBuyerDashboardOrganisation = data => ({
  type: BUYER_DASHBOARD_ORGANISATION,
  data
})

export const loadBuyerDashboardMyBriefs = (endpoint = '/dashboard/my/briefs') => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: endpoint }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleBuyerDashboardSuccess(BUYER_DASHBOARD_MYBRIEFS_SUCCESS, response))
      dispatch(handleBuyerDashboardOrganisation(response.data.organisation))
    }
    dispatch(sendingRequest(false))
  })
}

export const loadBuyerDashboardTeamBriefs = (endpoint = '/dashboard/team/briefs') => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: endpoint }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleBuyerDashboardSuccess(BUYER_DASHBOARD_TEAMBRIEFS_SUCCESS, response))
      dispatch(handleBuyerDashboardOrganisation(response.data.organisation))
    }
    dispatch(sendingRequest(false))
  })
}

export const loadBuyerDashboardTeamOverview = (endpoint = '/dashboard/team/overview') => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: endpoint }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleBuyerDashboardSuccess(BUYER_DASHBOARD_TEAMOVERVIEW_SUCCESS, response))
      dispatch(handleBuyerDashboardOrganisation(response.data.organisation))
    }
    dispatch(sendingRequest(false))
  })
}
