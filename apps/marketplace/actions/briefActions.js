import {
  BRIEF_INFO_FETCH_DATA_SUCCESS,
  BRIEF_PUBLIC_INFO_FETCH_DATA_SUCCESS,
  BRIEF_OVERVIEW_SUCCESS,
  BRIEF_RESPONSE_SUCCESS,
  BRIEF_SAVE_SUCCESS,
  BRIEF_RFX_CREATE_SUCCESS,
  BRIEF_ATM_CREATE_SUCCESS,
  BRIEF_SPECIALIST_CREATE_SUCCESS,
  DELETE_BRIEF_SUCCESS,
  SPECIALIST_NAME,
  SPECIALIST_NAME_SPLIT,
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
  briefResponses: response.data.briefResponses,
  oldWorkOrderCreator: response.data.oldWorkOrderCreator
})

export const handlePublicBriefInfoSuccess = response => ({
  type: BRIEF_PUBLIC_INFO_FETCH_DATA_SUCCESS,
  brief: response.data.brief,
  briefResponseCount: response.data.brief_response_count,
  invitedSellerCount: response.data.invited_seller_count,
  supplierBriefResponseCount: response.data.supplier_brief_response_count,
  canRespond: response.data.can_respond,
  isAssessedForCategory: response.data.is_assessed_for_category,
  isAssessedForAnyCategory: response.data.is_assessed_in_any_category,
  hasChosenBriefCategory: response.data.has_chosen_brief_category,
  isOpenToCategory: response.data.open_to_category,
  isOpenToAll: response.data.open_to_all,
  isBriefOwner: response.data.is_brief_owner,
  isBuyer: response.data.is_buyer,
  isApprovedSeller: response.data.is_approved_seller,
  isApplicant: response.data.is_applicant,
  isRecruiterOnly: response.data.is_recruiter_only,
  isAwaitingApplicationAssessment: response.data.is_awaiting_application_assessment,
  isAwaitingDomainAssessment: response.data.is_awaiting_domain_assessment,
  hasBeenAssessedForBrief: response.data.has_been_assessed_for_brief,
  hasResponded: response.data.has_responded,
  domains: response.data.domains,
  hasSupplierErrors: response.data.has_supplier_errors,
  isInvited: response.data.is_invited,
  hasSignedCurrentAgreement: response.data.has_signed_current_agreement
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

export const handleCreateSpecialistBriefSuccess = response => ({
  type: BRIEF_SPECIALIST_CREATE_SUCCESS,
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

export const createSpecialistBrief = () => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: '/brief/specialist',
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleCreateSpecialistBriefSuccess(response))
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

export function handleBriefNameSplitSubmit(specialistGivenNames, specialistSurname) {
  return {
    type: SPECIALIST_NAME_SPLIT,
    specialistGivenNames,
    specialistSurname
  }
}

export function handleSpecialistNumberSubmit(specialistNumber) {
  return { type: SPECIALIST_NUMBER, specialistNumber }
}

export function addAnotherSpecialistSubmit(addAnotherSpecialist) {
  return { type: ADD_ANOTHER_SPECIALIST, addAnotherSpecialist }
}

export const loadSuppliersResponded = briefId => () =>
  dmapi({ url: `/brief-response/${briefId}/suppliers` }).then(response => {
    response.data.loadedAt = new Date().valueOf()
    return response
  })

export const handleBriefAwardedSubmit = (briefId, model) => (dispatch, getState) =>
  dmapi({
    url: `/brief/${briefId}/award-seller`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(model)
  }).then(response => response)
