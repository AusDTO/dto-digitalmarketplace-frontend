import {
  DOMAIN_LOAD_SUCCESS,
  DOMAIN_EVIDENCE_LOAD_SUCCESS,
  EVIDENCE_CREATE_SUCCESS,
  EVIDENCE_LOAD_SUCCESS,
  EVIDENCE_FEEDBACK_LOAD_SUCCESS,
  EVIDENCE_SAVE_SUCCESS
} from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const findSuppliers = (keyword, category, all, codesToExclude = []) => {
  const params = {
    keyword,
    category,
    all,
    exclude: JSON.stringify(codesToExclude)
  }
  return dmapi({ url: `/suppliers/search`, params }).then(response => {
    if (!response || response.error) {
      throw response.errorMessage
    } else {
      return response.data
    }
  })
}

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

export const handleDomainLoadSuccess = response => ({
  type: DOMAIN_LOAD_SUCCESS,
  data: {
    id: response.data.id,
    name: response.data.name,
    priceMinimum: response.data.price_minimum,
    priceMaximum: response.data.price_maximum,
    criteria: response.data.criteria,
    criteriaNeeded: response.data.criteria_needed,
    criteriaEnforcementCutoffDate: response.data.criteriaEnforcementCutoffDate
  }
})

export const loadDomainData = domainId => dispatch => {
  dispatch(sendingRequest(true))
  return dmapi({ url: `/domains/${domainId}` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleDomainLoadSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleLoadDomainEvidenceSuccess = response => ({
  type: DOMAIN_EVIDENCE_LOAD_SUCCESS,
  data: {
    id: response.data.id,
    domainId: response.data.domainId,
    domainName: response.data.domain_name,
    domainCriteria: response.data.domain_criteria,
    supplierCode: response.data.supplierCode,
    maxDailyRate: response.data.maxDailyRate,
    submittedAt: response.data.submitted_at,
    criteria: response.data.criteria,
    evidence: response.data.evidence,
    status: response.data.status,
    created_at: response.data.created_at
  }
})

export const loadDomainEvidenceData = evidenceId => dispatch => {
  dispatch(sendingRequest(true))
  return dmapi({ url: `/evidence/${evidenceId}/view` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleLoadDomainEvidenceSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleLoadEvidenceSuccess = response => ({
  type: EVIDENCE_LOAD_SUCCESS,
  data: {
    id: response.data.id,
    domainId: response.data.domainId,
    supplierCode: response.data.supplierCode,
    maxDailyRate: response.data.maxDailyRate,
    submittedAt: response.data.submitted_at,
    criteria: response.data.criteria,
    failedCriteria: response.data.failed_criteria,
    previousEvidenceId: response.data.previous_evidence_id,
    evidence: response.data.evidence,
    status: response.data.status,
    created_at: response.data.created_at
  }
})

export const loadEvidenceData = evidenceId => dispatch => {
  dispatch(sendingRequest(true))
  return dmapi({ url: `/evidence/${evidenceId}` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleLoadEvidenceSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleLoadEvidenceFeedbackSuccess = response => ({
  type: EVIDENCE_FEEDBACK_LOAD_SUCCESS,
  data: {
    domainId: response.data.domain_id,
    domainName: response.data.domain_name,
    criteriaNeeded: response.data.criteria_needed,
    criteria: response.data.criteria,
    currentEvidenceId: response.data.current_evidence_id,
    vfm: response.data.vfm
  }
})

export const loadEvidenceFeedbackData = evidenceId => dispatch => {
  dispatch(sendingRequest(true))
  return dmapi({ url: `/evidence/${evidenceId}/feedback` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleLoadEvidenceFeedbackSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleCreateEvidenceSuccess = response => ({
  type: EVIDENCE_CREATE_SUCCESS,
  data: {
    id: response.data.id,
    domainId: response.data.domainId,
    supplierCode: response.data.supplierCode,
    maxDailyRate: response.data.maxDailyRate,
    submittedAt: response.data.submitted_at,
    criteria: response.data.criteria,
    evidence: response.data.evidence,
    status: response.data.status
  }
})

export const createEvidence = (domainId, briefId = null) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  const url = briefId ? `/evidence/${domainId}/${briefId}` : `/evidence/${domainId}`
  return dmapi({
    url,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleCreateEvidenceSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleEvidenceSaveSuccess = response => ({
  type: EVIDENCE_SAVE_SUCCESS,
  data: {
    id: response.data.id,
    domainId: response.data.domain_id,
    supplierCode: response.data.supplier_code,
    maxDailyRate: response.data.maxDailyRate
  }
})

export const saveEvidence = (evidenceId, data) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/evidence/${evidenceId}`,
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
      dispatch(handleEvidenceSaveSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}
