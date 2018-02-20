import { BRIEF_INFO_FETCH_DATA_SUCCESS, BRIEF_RESPONSE_SUCCESS, SPECIALIST_NAME } from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'

import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const handleBriefInfoSuccess = response => ({
  type: BRIEF_INFO_FETCH_DATA_SUCCESS,
  brief: response.data
})

export const handleErrorFailure = response => dispatch => {
  if (!response) {
    dispatch(setErrorMessage(GENERAL_ERROR))
  } else {
    if (response.data && response.data.errorMessage) {
      dispatch(setErrorMessage(response.data.errorMessage))
    }
    if (response.errorMessage) {
      if (response.code) {
        dispatch(setErrorMessage(`${GENERAL_ERROR} (${response.code}: ${response.errorMessage})`))
      } else {
        dispatch(setErrorMessage(`${GENERAL_ERROR} (${response.errorMessage})`))
      }
    } else {
      setErrorMessage(GENERAL_ERROR)
    }
  }
}

export const loadBrief = briefId => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: `/brief/${briefId}` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleBriefInfoSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const handleBriefResponseSuccess = () => ({ type: BRIEF_RESPONSE_SUCCESS })

export const handleBriefResponseSubmit = (briefId, model) => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({
    url: `/brief/${briefId}/respond`,
    method: 'POST',
    data: JSON.stringify(model)
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      window.scrollTo(0, 0)
      dispatch(handleBriefResponseSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export function handleBriefNameSubmit(specialistName) {
  return { type: SPECIALIST_NAME, specialistName }
}
