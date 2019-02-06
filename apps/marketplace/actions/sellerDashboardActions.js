import {
  SELLER_DASHBOARD_MESSAGES_LOAD,
  SELLER_DASHBOARD_SUCCESS,
  SELLER_DASHBOARD_TEAM_LOAD,
  SELLER_DASHBOARD_SERVICES_LOAD,
  SELLER_DASHBOARD_REMOVE_USER_SUCCESS
} from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const handleSellerDashboardSuccess = response => ({
  type: SELLER_DASHBOARD_SUCCESS,
  data: response.data
})

export const handleRemoveUserSuccess = response => ({
  type: SELLER_DASHBOARD_REMOVE_USER_SUCCESS,
  data: response.data
})

export const load = (type, data) => ({
  type: type,
  data: {
    items: data.items ? data.items : [],
    errors: data.errors ? true: false,
    loading: data.loading ? true : false
  }
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
  dispatch(load(SELLER_DASHBOARD_MESSAGES_LOAD, {
    loading: true
  }))
  dmapi({ url: `/supplier/dashboard/messages` }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
      dispatch(load(SELLER_DASHBOARD_MESSAGES_LOAD, {
        errors: true
      }))
    } else {
      dispatch(load(SELLER_DASHBOARD_MESSAGES_LOAD, {
        items: response.data.messages.items
      }))
    }
    dispatch(sendingRequest(false))
  })
}

export const loadTeam = () => dispatch => {
  dispatch(sendingRequest(true))
  dispatch(load(SELLER_DASHBOARD_TEAM_LOAD, {
    loading: true
  }))
  dmapi({ url: `/supplier/dashboard/team` }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
      dispatch(load(SELLER_DASHBOARD_TEAM_LOAD, {
        errors: true
      }))
    } else {
      dispatch(load(SELLER_DASHBOARD_TEAM_LOAD, {
        items: response.data.teams.items
      }))
    }
    dispatch(sendingRequest(false))
  })
}

export const loadServices = () => dispatch => {
  dispatch(sendingRequest(true))
  dispatch(load(SELLER_DASHBOARD_SERVICES_LOAD, {
    loading: true
  }))
  dmapi({ url: `/supplier/dashboard/services` }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
      dispatch(load(SELLER_DASHBOARD_SERVICES_LOAD, {
        errors: true
      }))
    } else {
      dispatch(load(SELLER_DASHBOARD_SERVICES_LOAD, {
        items: response.data.services.items
      }))
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
