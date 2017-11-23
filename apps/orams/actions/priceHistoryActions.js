import {
  SENDING_REQUEST,
  SET_ERROR_MESSAGE,
  BUYER_SUPPLIERS,
  SET_STEP,
  SET_SERVICE_DATA,
  SET_SUPPLIER_CODE,
  SET_PRICE_HISTORY_DATA
} from 'orams/constants/constants'
import { GENERAL_ERROR } from 'orams/constants/messageConstants'
import dmapi from 'orams/services/apiClient'

export const sendingRequest = sending => ({ type: SENDING_REQUEST, sending })

export const setErrorMessage = errorMessage => ({
  type: SET_ERROR_MESSAGE,
  errorMessage
})

export function setBuyerSuppliers(buyerSuppliers) {
  return { type: BUYER_SUPPLIERS, buyerSuppliers }
}

export function setStep(step) {
  return { type: SET_STEP, step }
}

export function setServiceData(serviceData) {
  return { type: SET_SERVICE_DATA, serviceData }
}

export function setSupplierCode(supplierCode) {
  return { type: SET_SUPPLIER_CODE, supplierCode }
}

export function setPriceHistoryData(priceHistoryData) {
  return { type: SET_PRICE_HISTORY_DATA, priceHistoryData }
}

export const loadBuyerSuppliers = () => dispatch => {
  dispatch(sendingRequest(true))
  dispatch(setErrorMessage(null))
  dmapi({ url: '/suppliers' }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(setBuyerSuppliers(response.data))
    }
    dispatch(sendingRequest(false))
  })
}

export const loadStepTwo = supplierCode => dispatch => {
  dispatch(sendingRequest(true))
  dispatch(setSupplierCode(supplierCode))
  dmapi({ url: `/suppliers/${supplierCode}` }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(setServiceData(response.data))
      dispatch(setStep(2))
    }
    dispatch(sendingRequest(false))
  })
}

export function loadPriceData(data) {
  return (dispatch, getState) => {
    const state = getState()

    const splitCodes = data.service.split('-')
    const serviceId = splitCodes[0]
    const categoryId = splitCodes[1]
    const supplierCode = state.priceHistory.supplierCode
    const date = data.date

    dispatch(sendingRequest(true))

    dmapi({
      url: `/prices/suppliers/${supplierCode}/services/${serviceId}/categories/${categoryId}?date=${date}`
    }).then(response => {
      if (response.error) {
        dispatch(setErrorMessage(GENERAL_ERROR))
      } else {
        dispatch(setPriceHistoryData(response.data))
        window.scrollTo(0, 0)
      }
      dispatch(sendingRequest(false))
    })
  }
}
