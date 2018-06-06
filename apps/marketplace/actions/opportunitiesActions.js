import { OPPORTUNITIES_SUCCESS, OPPORTUNITIES_SENDING } from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'
// import dmapi from '../services/apiClient'
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
  opportunities: response.opportunities
})

export const loadOpportunities = (filters = {}) => dispatch => {
  const opportunities = [
    {
      openTo: 'all',
      id: 1239,
      name: 'Automation proof of concept',
      location: 'Sydney',
      closing: '1w : 3d : 5h',
      submissions: '2 SME',
      company: 'Australian Taxation Office (ATO)'
    },
    {
      openTo: 'all',
      id: 1238,
      name: 'Exploration of commercial datasets to answer questions about household and SME energy use and costs',
      location: 'Offsite',
      closing: '5d : 6h : 36m',
      submissions: '16 (9 SME)',
      company: 'Department of the Environment and Energy'
    },
    {
      openTo: 'one',
      id: 1260,
      name: 'CA GEN Conversion consultancy for Proof of Concept (POC)',
      location: 'Australian Capital Territory',
      closing: '3d : 37h : 8m',
      submissions: '2',
      company: 'Australian Taxation Office (ATO)'
    },
    {
      openTo: 'Selected',
      id: 1263,
      name: 'Data Analytics for Heavy Vehicle Road Reform',
      location: 'Australian Capital Territory',
      closing: 'Closed',
      submissions: '8 (5 SME)',
      company: 'Land Transport Market Reform Branch, Department of Infrastructure, Regional Development and Cities.'
    }
  ]
  const response = {
    opportunities,
    filters
  }

  dispatch(sendingRequest(true))
  setTimeout(() => {
    dispatch(handleOpportunitiesSuccess(response))
    dispatch(sendingRequest(false))
  }, 1500)
  /* dispatch(sendingRequest(true))
  dmapi({ url: `/opportunities` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleOpportunitiesSuccess(response))
    }
    dispatch(sendingRequest(false))
  }) */
}
