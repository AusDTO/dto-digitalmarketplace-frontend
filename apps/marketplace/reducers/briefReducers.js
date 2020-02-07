import {
  BRIEF_INFO_FETCH_DATA_SUCCESS,
  BRIEF_PUBLIC_INFO_FETCH_DATA_SUCCESS,
  BRIEF_RESPONSE_LOAD_SUCCESS,
  BRIEF_RESPONSE_SUCCESS,
  BRIEF_RESPONSE_SUCCESS_RESET,
  BRIEF_RESPONSE_SAVE,
  BRIEF_RESPONSE_SAVE_RESET,
  BRIEF_SAVE_SUCCESS,
  BRIEF_RFX_CREATE_SUCCESS,
  BRIEF_TRAINING_CREATE_SUCCESS,
  BRIEF_ATM_CREATE_SUCCESS,
  SPECIALIST_NAME,
  SPECIALIST_NAME_SPLIT,
  SPECIALIST_NUMBER,
  BRIEF_OVERVIEW_SUCCESS,
  DELETE_BRIEF_SUCCESS
} from '../constants/constants'

const defaultBriefState = {
  loadBriefSuccess: null,
  briefSuccess: null,
  briefResponseSuccess: null,
  isDuplicate: null,
  brief: {},
  briefResponse: {},
  briefResponses: [],
  canCloseOpportunity: false,
  specialistName: '',
  specialistGivenNames: '',
  specialistSurname: '',
  specialistNumber: 1,
  briefResponseSave: false,
  overview: {
    sections: [],
    status: '',
    title: ''
  },
  briefResponseCount: 0,
  invitedSellerCount: 0,
  supplierBriefResponseCount: 0,
  supplierBriefResponseCountSubmitted: 0,
  supplierBriefResponseCountDraft: 0,
  supplierBriefResponseId: 0,
  supplierBriefResponseIsDraft: false,
  canRespond: false,
  isAssessedForCategory: false,
  isAssessedForAnyCategory: false,
  hasEvidenceInDraftForCategory: false,
  hasLatestEvidenceRejectedForCategory: false,
  draftEvidenceId: undefined,
  rejectedEvidenceId: undefined,
  isOpenToCategory: false,
  isOpenToAll: false,
  isBriefOwner: false,
  isBuyer: false,
  isApprovedSeller: false,
  isApplicant: false,
  isRecruiterOnly: false,
  isAwaitingApplicationAssessment: false,
  isAwaitingDomainAssessment: false,
  hasBeenAssessedForBrief: false,
  hasResponded: false,
  domains: [],
  hasSupplierErrors: false,
  isInvited: false,
  hasSignedCurrentAgreement: false
}

const briefReducer = (state = defaultBriefState, action) => {
  switch (action.type) {
    case BRIEF_OVERVIEW_SUCCESS:
      return {
        ...state,
        loadBriefOverviewSuccess: true,
        loadBriefOverviewErrored: false,
        overview: action.data
      }
    case BRIEF_INFO_FETCH_DATA_SUCCESS:
      return {
        ...state,
        brief: action.brief,
        loadBriefSuccess: true,
        briefResponses: action.briefResponses,
        canCloseOpportunity: action.canCloseOpportunity,
        isOpenToAll: action.isOpenToAll,
        specialistNumber: action.briefResponses.length > 0 ? action.briefResponses.length : 1,
        loadedAt: new Date().valueOf(),
        oldWorkOrderCreator: action.oldWorkOrderCreator,
        questionsAsked: action.questionsAsked,
        briefResponseDownloaded: action.briefResponseDownloaded,
        supplierContact: action.supplierContact
      }

    case BRIEF_PUBLIC_INFO_FETCH_DATA_SUCCESS:
      return {
        ...state,
        brief: action.brief,
        briefResponseCount: action.briefResponseCount,
        invitedSellerCount: action.invitedSellerCount,
        supplierBriefResponseCount: action.supplierBriefResponseCount,
        supplierBriefResponseCountSubmitted: action.supplierBriefResponseCountSubmitted,
        supplierBriefResponseCountDraft: action.supplierBriefResponseCountDraft,
        supplierBriefResponseId: action.supplierBriefResponseId,
        supplierBriefResponseIsDraft: action.supplierBriefResponseIsDraft,
        canRespond: action.canRespond,
        isAssessedForCategory: action.isAssessedForCategory,
        isAssessedForAnyCategory: action.isAssessedForAnyCategory,
        hasEvidenceInDraftForCategory: action.hasEvidenceInDraftForCategory,
        hasLatestEvidenceRejectedForCategory: action.hasLatestEvidenceRejectedForCategory,
        draftEvidenceId: action.draftEvidenceId,
        rejectedEvidenceId: action.rejectedEvidenceId,
        isOpenToCategory: action.isOpenToCategory,
        isOpenToAll: action.isOpenToAll,
        isBriefOwner: action.isBriefOwner,
        isBuyer: action.isBuyer,
        isApprovedSeller: action.isApprovedSeller,
        isApplicant: action.isApplicant,
        isRecruiterOnly: action.isRecruiterOnly,
        isAwaitingApplicationAssessment: action.isAwaitingApplicationAssessment,
        isAwaitingDomainAssessment: action.isAwaitingDomainAssessment,
        hasBeenAssessedForBrief: action.hasBeenAssessedForBrief,
        hasResponded: action.hasResponded,
        domains: action.domains,
        loadBriefSuccess: true,
        loadedAt: new Date().valueOf(),
        hasSupplierErrors: action.hasSupplierErrors,
        isInvited: action.isInvited,
        hasSignedCurrentAgreement: action.hasSignedCurrentAgreement
      }

    case BRIEF_SAVE_SUCCESS:
      return {
        ...state,
        brief: action.brief
      }

    case BRIEF_RFX_CREATE_SUCCESS:
      return {
        ...state,
        brief: action.brief
      }

    case BRIEF_TRAINING_CREATE_SUCCESS:
      return {
        ...state,
        brief: action.brief
      }
    case BRIEF_ATM_CREATE_SUCCESS:
      return {
        ...state,
        brief: action.brief
      }

    case BRIEF_RESPONSE_LOAD_SUCCESS:
      return {
        ...state,
        briefResponse: action.briefResponse
      }

    case BRIEF_RESPONSE_SUCCESS:
      return {
        ...state,
        briefResponseSuccess: true,
        briefResponses: [...state.briefResponses.filter(r => r.id !== action.briefResponse.id), action.briefResponse]
      }

    case BRIEF_RESPONSE_SUCCESS_RESET:
      return {
        ...state,
        briefResponseSuccess: null
      }

    case BRIEF_RESPONSE_SAVE:
      return {
        ...state,
        briefResponseSave: true
      }

    case BRIEF_RESPONSE_SAVE_RESET:
      return {
        ...state,
        briefResponseSave: false
      }

    case DELETE_BRIEF_SUCCESS:
      return {
        ...state,
        deleteBriefSuccess: true,
        deleteBriefErrored: false
      }
    case SPECIALIST_NAME:
      return {
        ...state,
        specialistName: action.specialistName
      }
    case SPECIALIST_NAME_SPLIT:
      return {
        ...state,
        specialistGivenNames: action.specialistGivenNames,
        specialistSurname: action.specialistSurname
      }

    case SPECIALIST_NUMBER:
      return {
        ...state,
        specialistNumber: action.specialistNumber + state.specialistNumber
      }

    default:
      return state
  }
}

export default briefReducer
