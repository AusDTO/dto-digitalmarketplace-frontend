import {
  SELLER_DASHBOARD_MESSAGES_SUCCESS,
  SELLER_DASHBOARD_SUCCESS,
  SELLER_DASHBOARD_TEAM_SUCCESS,
  SELLER_DASHBOARD_SERVICES_SUCCESS,
  SELLER_DASHBOARD_REMOVE_USER_SUCCESS
} from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const handleSellerDashboardSuccess = response => ({
  type: SELLER_DASHBOARD_SUCCESS,
  data: response.data
})

export const handleMessagesSuccess = response => ({
  type: SELLER_DASHBOARD_MESSAGES_SUCCESS,
  data: response.data
})

export const handleRemoveUserSuccess = response => ({
  type: SELLER_DASHBOARD_REMOVE_USER_SUCCESS,
  data: response.data
})

export const handleServicesSuccess = response => ({
  type: SELLER_DASHBOARD_SERVICES_SUCCESS,
  data: response.data
})

export const handleTeamSuccess = response => ({
  type: SELLER_DASHBOARD_TEAM_SUCCESS,
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

export const loadMessages = () => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: `/supplier/dashboard/messages` }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleMessagesSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const loadTeam = () => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: `/supplier/dashboard/team` }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleTeamSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const loadServices = () => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: `/supplier/dashboard/services` }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleServicesSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const removeUser = userId => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  dmapi({
    method: 'put',
    url: `/supplier/dashboard/user/${userId}/deactivate`,
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleRemoveUserSuccess(response))
      dispatch(loadTeam())
    }
    dispatch(sendingRequest(false))
  })
}
