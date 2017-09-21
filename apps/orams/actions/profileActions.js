import { SENDING_REQUEST, SET_ERROR_MESSAGE } from 'orams/constants/constants'
import { GENERAL_ERROR } from 'orams/constants/messageConstants'
import dmapi from 'orams/services/apiClient'
import { actions } from 'react-redux-form'

export const sendingRequest = sending => ({ type: SENDING_REQUEST, sending })

export const setErrorMessage = errorMessage => ({
  type: SET_ERROR_MESSAGE,
  errorMessage
})

export const loadProfile = (form) => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: '/profile' }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(actions.load(form, response.data.user.supplier))
    }
    dispatch(sendingRequest(false))
  })
}