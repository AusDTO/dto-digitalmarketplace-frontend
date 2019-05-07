import { SellerAssessmentFormReducer } from 'marketplace/reducers'
import { EVIDENCE_CREATE_SUCCESS, EVIDENCE_LOAD_SUCCESS, EVIDENCE_SAVE_SUCCESS } from '../constants/constants'

const defaultEvidenceState = { ...SellerAssessmentFormReducer }

const evidenceReducer = (state = defaultEvidenceState, action) => {
  switch (action.type) {
    case EVIDENCE_CREATE_SUCCESS:
    case EVIDENCE_LOAD_SUCCESS:
    case EVIDENCE_SAVE_SUCCESS:
      return {
        ...state,
        ...action.data
      }

    default:
      return state
  }
}

export default evidenceReducer
