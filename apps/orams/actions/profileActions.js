import { SENDING_REQUEST, SET_ERROR_MESSAGE, SET_PROFILE_STATE } from 'orams/constants/constants'
import { GENERAL_ERROR } from 'orams/constants/messageConstants'
import dmapi from 'orams/services/apiClient'
import { actions } from 'react-redux-form'

export const sendingRequest = sending => ({ type: SENDING_REQUEST, sending })

export const setErrorMessage = errorMessage => ({
  type: SET_ERROR_MESSAGE,
  errorMessage
})

export function setProfileState(newState) {
  return { type: SET_PROFILE_STATE, profile: newState }
}

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