import {
  BRIEF_INFO_FETCH_DATA_SUCCESS,
  BRIEF_INFO_HAS_ERRORED,
  BRIEF_RESPONSE_SUCCESS,
  BRIEF_RESPONSE_FAILURE,
  BRIEF_RESPONSE_DUPLICATE_FAILURE,
  SPECIALIST_NAME,
  SPECIALIST_NUMBER
} from '../constants/constants'

const defaultBriefState = {
  loadBriefSuccess: null,
  loadBriefErrored: null,
  briefSuccess: null,
  briefErrored: null,
  briefResponseSuccess: null,
  briefResponseErrored: null,
  errorMessage: null,
  isDuplicate: null,
  brief: {},
  briefResponse: {},
  specialistName: '',
  specialistNumber: 1
}

const briefReducer = (state = defaultBriefState, action) => {
  switch (action.type) {
    case BRIEF_INFO_FETCH_DATA_SUCCESS:
      return {
        ...state,
        brief: action.brief,
        loadBriefSuccess: true,
        loadBriefErrored: false,
        loadedAt: new Date().valueOf()
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
        briefResponse: action.data,
        briefResponseSuccess: true,
        briefResponseErrored: false
      }

    case BRIEF_RESPONSE_FAILURE:
      return {
        ...state,
        briefResponseErrored: true,
        briefResponseSuccess: false,
        errorMessage: action.errorMessage
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
        specialistNumber: action.specialistNumber
      }

    default:
      return state
  }
}

export default briefReducer
