import {
  BRIEF_INFO_FETCH_DATA_SUCCESS,
  BRIEF_PUBLIC_INFO_FETCH_DATA_SUCCESS,
  BRIEF_RESPONSE_SUCCESS,
  BRIEF_SAVE_SUCCESS,
  BRIEF_RFX_CREATE_SUCCESS,
  BRIEF_ATM_CREATE_SUCCESS,
  SPECIALIST_NAME,
  SPECIALIST_NAME_SPLIT,
  SPECIALIST_NUMBER,
  ADD_ANOTHER_SPECIALIST,
  BRIEF_OVERVIEW_SUCCESS,
  DELETE_BRIEF_SUCCESS
} from '../constants/constants'

const defaultBriefState = {
  loadBriefSuccess: null,
  briefSuccess: null,
  briefResponseSuccess: null,
  isDuplicate: null,
  brief: {},
  briefResponses: [],
  specialistName: '',
  specialistGivenNames: '',
  specialistSurname: '',
  specialistNumber: 1,
  addAnotherSpecialist: false,
  overview: {
    sections: [],
    status: '',
    title: ''
  },
  briefResponseCount: 0,
  invitedSellerCount: 0,
  supplierBriefResponseCount: 0,
  canRespond: false,
  isAssessedForCategory: false,
  isAssessedForAnyCategory: false,
  hasChosenBriefCategory: false,
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
        specialistNumber: action.briefResponses.length + 1,
        loadedAt: new Date().valueOf(),
        oldWorkOrderCreator: action.oldWorkOrderCreator
      }

    case BRIEF_PUBLIC_INFO_FETCH_DATA_SUCCESS:
      return {
        ...state,
        brief: action.brief,
        briefResponseCount: action.briefResponseCount,
        invitedSellerCount: action.invitedSellerCount,
        supplierBriefResponseCount: action.supplierBriefResponseCount,
        canRespond: action.canRespond,
        isAssessedForCategory: action.isAssessedForCategory,
        isAssessedForAnyCategory: action.isAssessedForAnyCategory,
        hasChosenBriefCategory: action.hasChosenBriefCategory,
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

    case BRIEF_ATM_CREATE_SUCCESS:
      return {
        ...state,
        brief: action.brief
      }

    case BRIEF_RESPONSE_SUCCESS:
      return {
        ...state,
        briefResponseSuccess: true,
        briefResponses: [...state.briefResponses, action.briefResponse]
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

    case ADD_ANOTHER_SPECIALIST:
      return {
        ...state,
        addAnotherSpecialist: action.addAnotherSpecialist
      }

    default:
      return state
  }
}

export default briefReducer
