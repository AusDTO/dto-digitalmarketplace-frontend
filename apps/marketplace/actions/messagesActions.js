import dmapi from '../services/apiClient'
import { MESSAGES_SUCCESS, MESSAGES_SENDING } from '../constants/constants'

export const sendingRequest = currentlySending => ({
  type: MESSAGES_SENDING,
  currentlySending
})

export const handleSupplierMessageSuccess = response => ({
  type: MESSAGES_SUCCESS,
  data: response.data
})

export const handleSupplierMessageFailure = message => ({
  type: MESSAGES_FAILURE,
  data: message
})

export const getSupplierMessages = supplierCode => dispatch => {
  const params = {}
  dispatch(sendingRequest(true))
  return dmapi({ url: `/supplier/${supplierCode}/messages`, params }).then(response => {
    if (!response || response.error) {
      dispatch(
        handleSupplierMessageFailure({
          errors: [
            {
              message: `A ${response.status} error has occured`
            }
          ]
        })
      )
    } else {
      dispatch(handleSupplierMessageSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}
