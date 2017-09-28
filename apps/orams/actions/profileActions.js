import { SENDING_REQUEST, SET_ERROR_MESSAGE, PROFILE_UPDATED } from 'orams/constants/constants'
import { GENERAL_ERROR } from 'orams/constants/messageConstants'
import dmapi from 'orams/services/apiClient'
import { actions } from 'react-redux-form'

export const sendingRequest = sending => ({ type: SENDING_REQUEST, sending })

export const setErrorMessage = errorMessage => ({
  type: SET_ERROR_MESSAGE,
  errorMessage
})

export const handleProfileUpdated = () => ({ type: PROFILE_UPDATED })

export const loadProfile = form => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: '/supplier' }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(actions.load(form, response.data.user))
    }
    dispatch(sendingRequest(false))
  })
}

export const updateProfile = values => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({
    method: 'post',
    url: '/supplier',
    data: JSON.stringify(values)
  }).then(response => {
    if (response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(handleProfileUpdated(response))
    }
    dispatch(sendingRequest(false))
  })
}
