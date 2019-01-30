import { SELLER_DASHBOARD_SUCCESS, TEAM_SUCCESS } from '../constants/sellerDashboard'
import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const handleSellerDashboardSuccess = response => ({
  type: SELLER_DASHBOARD_SUCCESS,
  data: response.data
})

export const handleTeamSuccess = response => ({
  type: TEAM_SUCCESS,
  data: response.data
})

export const loadSellerDashboard = () => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: `/supplier/dashboard` }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleSellerDashboardSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const loadTeam = () => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: `/supplier/871/messages` }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleTeamSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}
