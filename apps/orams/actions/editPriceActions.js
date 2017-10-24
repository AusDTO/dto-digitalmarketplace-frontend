/* eslint-disable */
import {
  SENDING_REQUEST,
  SET_ERROR_MESSAGE,
  SET_EDIT_SERVICE_DATA
} from 'orams/constants/constants'
import { GENERAL_ERROR } from 'orams/constants/messageConstants'
import dmapi from 'orams/services/apiClient'

export const sendingRequest = sending => ({ type: SENDING_REQUEST, sending })

export const setErrorMessage = errorMessage => ({
  type: SET_ERROR_MESSAGE,
  errorMessage
})

export function setServiceEditData(editServiceData) {
  return { type: SET_EDIT_SERVICE_DATA, editServiceData }
}

export const loadServiceEditData = () => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: '/supplier/services' }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(setServiceEditData(response.data))
    }
    dispatch(sendingRequest(false))
  })
}

export const loadPricesData = (serviceTypeId, categoryId) => dispatch => {
  dispatch(sendingRequest(true))

  const baseUrl = () => {
    if (serviceTypeId && categoryId) {
      return "/services/" + serviceTypeId + "/categories/" + categoryId + "/prices/"
    }

    if (serviceTypeId) {
      return "/services/" + serviceTypeId + "/prices/"
    }
  }

  dmapi({ url: baseUrl }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      console.log("RESPONSE", response.data)
    }
    dispatch(sendingRequest(false))
  })
}
