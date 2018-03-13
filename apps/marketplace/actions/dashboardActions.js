import { SELLER_DASHBOARD_SUCCESS } from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const handleSellerDashboardSuccess = response => ({
  type: SELLER_DASHBOARD_SUCCESS,
  data: response.data
})

export const loadSellerDashboard = () => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: `/seller-dashboard` }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleSellerDashboardSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const handleBuyerDashboardSuccess = (type, response) => ({
  type,
  data: response.data
})

export const loadBuyerDashboard = (type, endpoint = '/buyers/dashboard/my/briefs') => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: endpoint }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleBuyerDashboardSuccess(type, response))
    }
    dispatch(sendingRequest(false))
  })
}
