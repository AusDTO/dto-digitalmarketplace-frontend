import { SENDING_REQUEST, SET_ERROR_MESSAGE, BUYER_SUPPLIERS } from 'orams/constants/constants'
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
