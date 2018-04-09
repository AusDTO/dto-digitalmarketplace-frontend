import {
  BRIEF_INFO_FETCH_DATA_SUCCESS,
  BRIEF_SELLERS_FETCH_DATA_SUCCESS,
  BRIEF_RESPONSES_FETCH_DATA_SUCCESS,
  BRIEF_INFO_HAS_ERRORED,
  BRIEF_RESPONSE_SUCCESS,
  BRIEF_RESPONSE_FAILURE,
  BRIEF_RESPONSE_DUPLICATE_FAILURE,
  BRIEF_SELLER_NOTIFY_SUBMIT_SUCCESS,
  SPECIALIST_NAME,
  SPECIALIST_NUMBER,
  ADD_ANOTHER_SPECIALIST
} from '../constants/constants'

const defaultBriefState = {
  loadBriefSuccess: null,
  loadBriefErrored: null,
  briefSuccess: null,
  briefErrored: null,
  briefResponseSuccess: null,
  briefResponseErrored: null,
  briefSellerUnsuccessfulSubmitSuccess: null,
  errorMessage: null,
  isDuplicate: null,
  brief: {},
  briefResponse: {},
  briefResponses: [],
  sellers: []
}

const briefReducer = (state = defaultBriefState, action) => {
  switch (action.type) {
    case BRIEF_INFO_FETCH_DATA_SUCCESS:
      return {
        ...state,
        brief: action.brief,
        loadBriefSuccess: true,
        loadBriefErrored: false,
        briefResponses: action.briefResponses,
        specialistNumber: action.briefResponses.length + 1,
        loadedAt: new Date().valueOf()
      }

    case BRIEF_SELLERS_FETCH_DATA_SUCCESS:
      return {
        ...state,
        brief: action.brief,
        loadBriefSuccess: true,
        loadBriefErrored: false,
        sellers: action.sellers,
        loadedAt: new Date().valueOf()
      }

    case BRIEF_RESPONSES_FETCH_DATA_SUCCESS:
      return {
        ...state,
        briefResponses: action.data.briefResponses
      }

    case BRIEF_INFO_HAS_ERRORED:
      return {
        ...state,
        loadBriefErrored: true,
        loadBriefSuccess: false,
        errorMessage: action.errorMessage
      }
    case BRIEF_RESPONSE_SUCCESS:
      return {
        ...state,
        briefResponseSuccess: true,
        briefResponseErrored: false,
        briefResponses: [...state.briefResponses, action.briefResponse]
      }

    case BRIEF_RESPONSE_FAILURE:
      return {
        ...state,
        briefResponseErrored: true,
        briefResponseSuccess: false,
        errorMessage: action.errorMessage
      }

    case BRIEF_SELLER_NOTIFY_SUBMIT_SUCCESS:
      return {
        ...state,
        briefSellerNotifySubmitSuccess: true
      }

    case BRIEF_RESPONSE_DUPLICATE_FAILURE:
      return {
        ...state,
        briefResponseErrored: true,
        briefResponseSuccess: false,
        isDuplicate: true,
        errorMessage: action.errorMessage
      }

    case SPECIALIST_NAME:
      return {
        ...state,
        specialistName: action.specialistName
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
