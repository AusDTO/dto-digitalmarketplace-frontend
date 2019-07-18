import { SELLER_EDIT_SUCCESS } from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const loadSeller = data => ({
  type: SELLER_EDIT_SUCCESS,
  data: {
    supplier: data.supplier,
    agreementStatus: data.agreementStatus,
    errors: data.errors,
    loading: data.loading,
    loadedAt: new Date()
  }
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

export const loadSellerEdit = supplierCode => dispatch => {
  dispatch(sendingRequest(true))
  dispatch(
    loadSeller({
      loading: true
    })
  )
  return dmapi({ url: `/supplier/${supplierCode}/edit` }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
      dispatch(
        loadSeller({
          loading: false,
          errors: true
        })
      )
    } else {
      dispatch(
        loadSeller({
          supplier: response.data.supplier,
          agreementStatus: response.data.agreement_status
        })
      )
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const saveSeller = (supplierCode, data) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/supplier/${supplierCode}/edit`,
    method: 'PATCH',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(
        loadSeller({
          supplier: response.data.supplier,
          agreementStatus: response.data.agreement_status
        })
      )
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const declineAgreement = supplierCode => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/supplier/${supplierCode}/edit/decline-agreement`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const acceptAgreement = supplierCode => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/supplier/${supplierCode}/edit/accept-agreement`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(
        loadSeller({
          supplier: response.data.supplier,
          agreementStatus: response.data.agreement_status
        })
      )
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const notifyAuthRep = supplierCode => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/supplier/${supplierCode}/edit/notify-auth-rep`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(
        loadSeller({
          supplier: response.data.supplier,
          agreementStatus: response.data.agreement_status
        })
      )
    }
    dispatch(sendingRequest(false))
    return response
  })
}
