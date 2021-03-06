import { SellerAssessmentFormReducer } from 'marketplace/reducers'
import {
  CASE_STUDIES_LOAD_SUCCESS,
  DOMAIN_EVIDENCE_LOAD_SUCCESS,
  EVIDENCE_CREATE_SUCCESS,
  EVIDENCE_LOAD_SUCCESS,
  EVIDENCE_SAVE_SUCCESS,
  EVIDENCE_FEEDBACK_LOAD_SUCCESS
} from '../constants/constants'

const defaultEvidenceState = { ...SellerAssessmentFormReducer }

const evidenceReducer = (state = defaultEvidenceState, action) => {
  switch (action.type) {
    case CASE_STUDIES_LOAD_SUCCESS:
    case DOMAIN_EVIDENCE_LOAD_SUCCESS:
    case EVIDENCE_CREATE_SUCCESS:
    case EVIDENCE_LOAD_SUCCESS:
    case EVIDENCE_SAVE_SUCCESS:
      return {
        ...state,
        ...action.data
      }

    case EVIDENCE_FEEDBACK_LOAD_SUCCESS:
      return {
        ...state,
        feedback: { ...action.data }
      }

    default:
      return state
  }
}

export default evidenceReducer
