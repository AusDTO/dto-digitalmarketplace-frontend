import { actions } from 'react-redux-form'
import { OPPORTUNITIES_SUCCESS, OPPORTUNITIES_SENDING, OPPORTUNITIES_SET_PAGE } from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { setErrorMessage } from './appActions'

export const handleErrorFailure = response => dispatch => {
  if (!response) {
    dispatch(setErrorMessage(GENERAL_ERROR))
  } else {
    if (response.data && response.data.message) {
      dispatch(setErrorMessage(response.data.message))
    }
    if (response.message) {
      if (response.code) {
        dispatch(setErrorMessage(`${GENERAL_ERROR} (${response.code}: ${response.message})`))
      } else {
        dispatch(setErrorMessage(`${GENERAL_ERROR} (${response.message})`))
      }
    } else {
      setErrorMessage(GENERAL_ERROR)
    }
  }
}

export const sendingRequest = currentlySending => ({
  type: OPPORTUNITIES_SENDING,
  currentlySending
})

export const handleOpportunitiesSuccess = response => ({
  type: OPPORTUNITIES_SUCCESS,
  opportunities: response.data.opportunities,
  lockoutPeriod: response.data.lockoutPeriod
})

export const setCurrentPage = page => dispatch => {
  dispatch({
    type: OPPORTUNITIES_SET_PAGE,
    currentPage: page
  })
}

export const loadOpportunities = (filters = {}) => dispatch => {
  const statusFilters = filters.status ? Object.keys(filters.status).filter(k => filters.status[k]) : []
  const openToFilters = filters.openTo ? Object.keys(filters.openTo).filter(k => filters.openTo[k]) : []
  const typeFilters = filters.type ? Object.keys(filters.type).filter(k => filters.type[k]) : []
  const locationFilters = filters.location ? Object.keys(filters.location).filter(k => filters.location[k]) : []

  const params = {
    statusFilters: statusFilters.join(','),
    openToFilters: openToFilters.join(','),
    typeFilters: typeFilters.join(','),
    locationFilters: locationFilters.join(',')
  }

  dispatch(sendingRequest(true))
  dmapi({ url: `/opportunities`, params }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleOpportunitiesSuccess(response))
      dispatch(setCurrentPage(1))
    }
    dispatch(sendingRequest(false))
  })
}

export const changeForm = (values, options = {}) => dispatch => {
  dispatch(actions.change('opportunitiesFilterForm', values, options))
}
