import { DOMAIN_LOAD_SUCCESS } from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const findSuppliers = (keyword, category) => {
  const params = {
    keyword,
    category
  }
  return dmapi({ url: `/suppliers/search`, params }).then(response => {
    if (!response || response.error) {
      throw response.errorMessage
    } else {
      return response.data
    }
  })
}

export default findSuppliers

export const handleDomainLoadSuccess = response => ({
  type: DOMAIN_LOAD_SUCCESS,
  data: response.data
})

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

export const loadDomainData = domainId => dispatch => {
  dispatch(sendingRequest(true))
  return dmapi({ url: `/domains/${domainId}` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleDomainLoadSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}
