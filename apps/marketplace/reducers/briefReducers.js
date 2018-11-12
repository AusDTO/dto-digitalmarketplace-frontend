import {
  BRIEF_INFO_FETCH_DATA_SUCCESS,
  BRIEF_PUBLIC_INFO_FETCH_DATA_SUCCESS,
  BRIEF_RESPONSE_SUCCESS,
  BRIEF_SAVE_SUCCESS,
  SPECIALIST_NAME,
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
  specialistNumber: 1,
  addAnotherSpecialist: false,
  overview: {
    sections: [],
    status: '',
    title: ''
  },
  briefResponseCount: 0,
  invitedSellerCount: 0,
  isInvitedSeller: false,
  domains: []
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
        loadedAt: new Date().valueOf()
      }

    case BRIEF_PUBLIC_INFO_FETCH_DATA_SUCCESS:
      return {
        ...state,
        brief: action.brief,
        briefResponseCount: action.briefResponseCount,
        invitedSellerCount: action.invitedSellerCount,
        isInvitedSeller: action.isInvitedSeller,
        domains: action.domains,
        loadBriefSuccess: true,
        loadedAt: new Date().valueOf()
      }

    case BRIEF_SAVE_SUCCESS:
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
