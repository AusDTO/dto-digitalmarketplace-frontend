import { OPPORTUNITIES_SUCCESS, OPPORTUNITIES_SENDING } from '../constants/constants'
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
  opportunities: response.data.opportunities
})

export const loadOpportunities = (filters = {}) => dispatch => {
  const getSelectedFilters = f =>
    Object.keys(f)
      .filter(k => f[k])
      .join(',')

  const params = {
    statusFilters: filters.statusFilters ? getSelectedFilters(filters.statusFilters) : '',
    openToFilters: filters.openToFilters ? getSelectedFilters(filters.openToFilters) : '',
    typeFilters: filters.typeFilters ? getSelectedFilters(filters.typeFilters) : ''
  }

  dispatch(sendingRequest(true))
  dmapi({ url: `/opportunities`, params }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleOpportunitiesSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}
