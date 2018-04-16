import {
  BRIEF_INFO_FETCH_DATA_SUCCESS,
  BRIEF_OVERVIEW_SUCCESS,
  BRIEF_RESPONSE_SUCCESS,
  SPECIALIST_NAME,
  SPECIALIST_NUMBER,
  ADD_ANOTHER_SPECIALIST
} from '../constants/constants'

import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const handleBriefOverviewSuccess = response => ({
  type: BRIEF_OVERVIEW_SUCCESS,
  brief: response
})

export const loadBriefOverview = briefId => dispatch => {
  dispatch(sendingRequest(true))
  dispatch(handleBriefOverviewSuccess(BRIEF_OVERVIEW_SUCCESS, JSON.stringify({ brief: 123 })))
  dispatch(sendingRequest(false))
}

export const handleBriefInfoSuccess = response => ({
  type: BRIEF_INFO_FETCH_DATA_SUCCESS,
  brief: response.data.brief,
  briefResponses: response.data.briefResponses
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

export const loadBrief = briefId => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: `/brief/${briefId}/responses` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleBriefInfoSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const handleBriefResponseSuccess = response => ({
  type: BRIEF_RESPONSE_SUCCESS,
  briefResponse: response.data.briefResponses
})

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
      dispatch(handleBriefResponseSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export function handleBriefNameSubmit(specialistName) {
  return { type: SPECIALIST_NAME, specialistName }
}

export function handleSpecialistNumberSubmit(specialistNumber) {
  return { type: SPECIALIST_NUMBER, specialistNumber }
}

export function addAnotherSpecialistSubmit(addAnotherSpecialist) {
  return { type: ADD_ANOTHER_SPECIALIST, addAnotherSpecialist }
}
