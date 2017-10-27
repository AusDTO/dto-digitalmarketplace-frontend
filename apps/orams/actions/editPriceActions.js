/* eslint-disable */
import {
  SENDING_REQUEST,
  SET_ERROR_MESSAGE,
  SET_EDIT_SERVICE_DATA,
  SET_PRICES_DATA,
  SET_STEP,
  SET_PRICE_TO_EDIT_DATA,
  SET_SERVICE_TO_EDIT_IN_STATE
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

export function setPricesData(pricesData) {
  return { type: SET_PRICES_DATA, pricesData }
}

export function setStep(step) {
  return { type: SET_STEP, step }
}

export function setPriceToEdit(priceData) {
  return { type: SET_PRICE_TO_EDIT_DATA, priceData }
}

export function setServiceToEditInState(serviceToEdit) {
  return { type: SET_SERVICE_TO_EDIT_IN_STATE, serviceToEdit }
}

export const setPrice = priceToEditData => dispatch => {
  dispatch(setPriceToEdit(priceToEditData))
  dispatch(setStep(3))
}

export const loadServiceEditData = () => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: '/supplier/services' }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(setServiceEditData(response.data))
      dispatch(setStep(1))
    }
    dispatch(sendingRequest(false))
  })
}

export const loadPricesData = (serviceTypeId, categoryId, serviceName, subCategoryName) => dispatch => {
  dispatch(sendingRequest(true))

  const serviceToEdit = {
    serviceTypeId: serviceTypeId,
    categoryId: categoryId,
    serviceName: serviceName,
    subCategoryName: subCategoryName
  }

  dispatch(setServiceToEditInState(serviceToEdit))

  const hasCategory = categoryId ? '/categories/' + categoryId : ''
  const baseUrl = '/supplier/services/' + serviceTypeId + hasCategory + '/prices'

  dmapi({ url: baseUrl }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(setPricesData(response.data))
      dispatch(setStep(2))
    }
    dispatch(sendingRequest(false))
  })
}
