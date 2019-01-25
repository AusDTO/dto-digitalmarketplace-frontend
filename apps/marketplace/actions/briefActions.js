import {
  BRIEF_INFO_FETCH_DATA_SUCCESS,
  BRIEF_PUBLIC_INFO_FETCH_DATA_SUCCESS,
  BRIEF_OVERVIEW_SUCCESS,
  BRIEF_RESPONSE_SUCCESS,
  BRIEF_SAVE_SUCCESS,
  BRIEF_RFX_CREATE_SUCCESS,
  BRIEF_ATM_CREATE_SUCCESS,
  DELETE_BRIEF_SUCCESS,
  SPECIALIST_NAME,
  SPECIALIST_NUMBER,
  ADD_ANOTHER_SPECIALIST
} from '../constants/constants'

import {
  BRIEF_ID_NOT_FOUND,
  BRIEF_LOT_NOT_SUPPORTED,
  BRIEF_MUST_BE_DRAFT,
  GENERAL_ERROR
} from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const handleBriefOverviewSuccess = response => ({
  type: BRIEF_OVERVIEW_SUCCESS,
  data: response.data
})

export const loadBriefOverview = briefId => dispatch => {
  const getErrorMessage = status =>
    ({
      400: BRIEF_LOT_NOT_SUPPORTED,
      404: BRIEF_ID_NOT_FOUND,
      default: GENERAL_ERROR
    }[status])

  dispatch(sendingRequest(true))
  dmapi({ url: `/brief/${briefId}/overview` }).then(response => {
    if (!response || response.error) {
      const errorMessage = getErrorMessage(response.status) || getErrorMessage('default')
      dispatch(setErrorMessage(errorMessage))
    } else {
      dispatch(handleBriefOverviewSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const handleDeleteBriefSuccess = response => ({
  type: DELETE_BRIEF_SUCCESS,
  data: response.data
})

export const deleteBrief = briefId => (dispatch, getState) => {
  const getErrorMessage = status =>
    ({
      400: BRIEF_MUST_BE_DRAFT,
      404: BRIEF_ID_NOT_FOUND,
      default: GENERAL_ERROR
    }[status])

  dispatch(sendingRequest(true))
  dmapi({
    method: 'delete',
    url: `/brief/${briefId}`,
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (!response || response.error) {
      const errorMessage = getErrorMessage(response.status) || getErrorMessage('default')
      dispatch(setErrorMessage(errorMessage))
    } else {
      dispatch(handleDeleteBriefSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const handleBriefInfoSuccess = response => ({
  type: BRIEF_INFO_FETCH_DATA_SUCCESS,
  brief: response.data.brief,
  briefResponses: response.data.briefResponses
})

export const handlePublicBriefInfoSuccess = response => ({
  type: BRIEF_PUBLIC_INFO_FETCH_DATA_SUCCESS,
  brief: response.data.brief,
  briefResponseCount: response.data.brief_response_count,
  invitedSellerCount: response.data.invited_seller_count,
  isInvitedSeller: response.data.is_invited_seller,
  isAssessedForCategory: response.data.is_assessed_for_category,
  isOpenToCategory: response.data.open_to_category,
  isOpenToAll: response.data.open_to_all,
  isBriefOwner: response.data.is_brief_owner,
  isBuyer: response.data.is_buyer,
  hasResponded: response.data.has_responded,
  domains: response.data.domains
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

export const handleCreateRFXBriefSuccess = response => ({
  type: BRIEF_RFX_CREATE_SUCCESS,
  brief: response.data
})

export const handleCreateATMBriefSuccess = response => ({
  type: BRIEF_ATM_CREATE_SUCCESS,
  brief: response.data
})

export const createRFXBrief = () => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: '/brief/rfx',
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleCreateRFXBriefSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const createATMBrief = () => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: '/brief/atm',
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleCreateATMBriefSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleBriefSaveSuccess = response => ({
  type: BRIEF_SAVE_SUCCESS,
  brief: response.data.brief
})

export const saveBrief = (briefId, data) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/brief/${briefId}`,
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
      dispatch(handleBriefSaveSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const loadBrief = briefId => dispatch => {
  dispatch(sendingRequest(true))
  return dmapi({ url: `/brief/${briefId}/responses` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleBriefInfoSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const loadPublicBrief = briefId => dispatch => {
  dispatch(sendingRequest(true))
  return dmapi({ url: `/brief/${briefId}` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handlePublicBriefInfoSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleBriefResponseSuccess = response => ({
  type: BRIEF_RESPONSE_SUCCESS,
  briefResponse: response.data.briefResponses
})

export const handleBriefResponseSubmit = (briefId, model) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  dmapi({
    url: `/brief/${briefId}/respond`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
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
