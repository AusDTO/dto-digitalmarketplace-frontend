import {
  BRIEF_INFO_FETCH_DATA_SUCCESS,
  BRIEF_PUBLIC_INFO_FETCH_DATA_SUCCESS,
  BRIEF_OVERVIEW_SUCCESS,
  BRIEF_RESPONSE_LOAD_SUCCESS,
  BRIEF_RESPONSE_SUCCESS,
  BRIEF_RESPONSE_SUCCESS_RESET,
  BRIEF_RESPONSE_CREATE_SUCCESS,
  BRIEF_RESPONSE_SAVE,
  BRIEF_RESPONSE_DELETE,
  BRIEF_RESPONSE_SAVE_RESET,
  BRIEF_SAVE_SUCCESS,
  BRIEF_RFX_CREATE_SUCCESS,
  BRIEF_TRAINING_CREATE_SUCCESS,
  BRIEF_ATM_CREATE_SUCCESS,
  BRIEF_SPECIALIST_CREATE_SUCCESS,
  CLOSE_OPPORTUNITY_SUCCESS,
  DELETE_BRIEF_SUCCESS,
  EDIT_OPPORTUNITY_SUCCESS,
  LOAD_OPPORTUNITY_TO_EDIT_SUCCESS,
  LOAD_OPPORTUNITY_EDIT_HISTORY_SUCCESS,
  SPECIALIST_NAME,
  SPECIALIST_NAME_SPLIT,
  SPECIALIST_NUMBER,
  WITHDRAW_OPPORTUNITY_SUCCESS
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
  canCloseOpportunity: response.data.canCloseOpportunity,
  isOpenToAll: response.data.isOpenToAll,
  oldWorkOrderCreator: response.data.oldWorkOrderCreator,
  questionsAsked: response.data.questionsAsked,
  briefResponseDownloaded: response.data.briefResponseDownloaded,
  supplierContact: response.data.supplierContact
})

export const handlePublicBriefInfoSuccess = response => ({
  type: BRIEF_PUBLIC_INFO_FETCH_DATA_SUCCESS,
  brief: response.data.brief,
  briefResponseCount: response.data.brief_response_count,
  invitedSellerCount: response.data.invited_seller_count,
  supplierBriefResponseCount: response.data.supplier_brief_response_count,
  supplierBriefResponseCountSubmitted: response.data.supplier_brief_response_count_submitted,
  supplierBriefResponseCountDraft: response.data.supplier_brief_response_count_draft,
  supplierBriefResponseId: response.data.supplier_brief_response_id,
  supplierBriefResponseIsDraft: response.data.supplier_brief_response_is_draft,
  canRespond: response.data.can_respond,
  isAssessedForCategory: response.data.is_assessed_for_category,
  isAssessedForAnyCategory: response.data.is_assessed_in_any_category,
  hasEvidenceInDraftForCategory: response.data.has_evidence_in_draft_for_category,
  hasLatestEvidenceRejectedForCategory: response.data.has_latest_evidence_rejected_for_category,
  draftEvidenceId: response.data.evidence_id,
  rejectedEvidenceId: response.data.evidence_id_rejected,
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
  hasSignedCurrentAgreement: response.data.has_signed_current_agreement,
  lastEditedAt: response.data.last_edited_at,
  onlySellersEdited: response.data.only_sellers_edited
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

export const handleCreateTrainingBriefSuccess = response => ({
  type: BRIEF_TRAINING_CREATE_SUCCESS,
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

export const handleCloseOpportunitySuccess = response => ({
  type: CLOSE_OPPORTUNITY_SUCCESS,
  brief: response.data
})

export const closeOpportunity = briefId => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/brief/${briefId}/close`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleCloseOpportunitySuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleWithdrawOpportunitySuccess = response => ({
  type: WITHDRAW_OPPORTUNITY_SUCCESS,
  brief: response.data
})

export const withdrawOpportunity = (briefId, data) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/brief/${briefId}/withdraw`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleWithdrawOpportunitySuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

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

export const createTrainingBrief = () => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: '/brief/training',
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleCreateTrainingBriefSuccess(response))
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

export const handleLoadOpportunityToEditSuccess = response => ({
  type: LOAD_OPPORTUNITY_TO_EDIT_SUCCESS,
  brief: response.data.brief,
  domains: response.data.domains,
  isOpenToAll: response.data.isOpenToAll
})

export const loadOpportunityToEdit = briefId => dispatch => {
  dispatch(sendingRequest(true))
  return dmapi({ url: `/brief/${briefId}/edit` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(handleLoadOpportunityToEditSuccess(response))
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

export const handleLoadBriefResponse = response => ({
  type: BRIEF_RESPONSE_LOAD_SUCCESS,
  briefResponse: response.data
})

export const loadBriefResponse = briefResponseId => dispatch => {
  dispatch(sendingRequest(true))
  return dmapi({ url: `/brief-response/${briefResponseId}` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleLoadBriefResponse(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleBriefResponseSuccess = response => ({
  type: BRIEF_RESPONSE_SUCCESS,
  briefResponse: response.data
})

export const resetBriefResponseSuccess = () => ({
  type: BRIEF_RESPONSE_SUCCESS_RESET
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

export const handleCreateBriefResponseSuccess = response => ({
  type: BRIEF_RESPONSE_CREATE_SUCCESS,
  createdBriefResponse: response.data
})

export const createBriefResponse = briefId => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/brief/${briefId}/respond`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleCreateBriefResponseSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleSaveBriefResponse = () => ({
  type: BRIEF_RESPONSE_SAVE
})

export const resetBriefResponseSave = () => ({
  type: BRIEF_RESPONSE_SAVE_RESET
})

export const saveBriefResponse = (briefId, briefResponseId, model) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  dmapi({
    url: `/brief/${briefId}/respond/${briefResponseId}`,
    method: 'PATCH',
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
      dispatch(handleLoadBriefResponse(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const handleDeleteBriefResponse = () => ({
  type: BRIEF_RESPONSE_DELETE
})

export const deleteBriefResponse = briefResponseId => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/brief-response/${briefResponseId}/withdraw`,
    method: 'PUT',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleDeleteBriefResponse())
    }
    dispatch(sendingRequest(false))
    return response
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
  })

export const submitSupplierQuestion = (briefId, values) => (dispatch, getState) =>
  dmapi({
    url: `/brief/${briefId}/ask-a-question`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(values)
  })

export const publishAnswer = (briefId, values) => (dispatch, getState) =>
  dmapi({
    url: `/brief/${briefId}/publish-answer`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(values)
  })

export const handleEditOpportunitySuccess = response => ({
  type: EDIT_OPPORTUNITY_SUCCESS,
  brief: response.data
})

export const applyEditsToOpportunity = (briefId, data) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/brief/${briefId}/edit`,
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
      dispatch(handleEditOpportunitySuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleLoadOpportunityHistorySuccess = response => ({
  type: LOAD_OPPORTUNITY_EDIT_HISTORY_SUCCESS,
  brief: response.data.brief,
  edits: response.data.edits
})

export const loadOpportunityHistory = briefId => dispatch => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/brief/${briefId}/history`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleLoadOpportunityHistorySuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}
