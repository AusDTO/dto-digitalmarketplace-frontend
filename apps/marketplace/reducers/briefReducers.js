import {
  BRIEF_INFO_FETCH_DATA_SUCCESS,
  BRIEF_DOWNLOAD_DOCUMENTS_SUCCESS,
  BRIEF_RESPONSE_SUCCESS,
  SPECIALIST_NAME,
  SPECIALIST_NUMBER,
  ADD_ANOTHER_SPECIALIST
} from '../constants/constants'

const defaultBriefState = {
  loadBriefSuccess: null,
  briefSuccess: null,
  briefResponseSuccess: null,
  isDuplicate: null,
  brief: {},
  briefResponses: [],
  documentsData: null,
  specialistName: '',
  specialistNumber: 1,
  addAnotherSpecialist: false
}

const briefReducer = (state = defaultBriefState, action) => {
  switch (action.type) {
    case BRIEF_INFO_FETCH_DATA_SUCCESS:
      return {
        ...state,
        brief: action.brief,
        loadBriefSuccess: true,
        briefResponses: action.briefResponses,
        specialistNumber: action.briefResponses.length + 1,
        loadedAt: new Date().valueOf()
      }

    case BRIEF_DOWNLOAD_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documentsData: action.data
      }

    case BRIEF_RESPONSE_SUCCESS:
      return {
        ...state,
        briefResponseSuccess: true,
        briefResponses: [...state.briefResponses, action.briefResponse]
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
