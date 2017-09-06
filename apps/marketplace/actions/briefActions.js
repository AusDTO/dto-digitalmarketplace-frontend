import {
  BRIEF_INFO_FETCH_DATA_SUCCESS,
  BRIEF_INFO_HAS_ERRORED,
  BRIEF_RESPONSE_SUCCESS,
  BRIEF_RESPONSE_FAILURE,
  BRIEF_RESPONSE_DUPLICATE_FAILURE
} from '../constants/constants'

import dmapi from '../services/apiClient'
import { sendingRequest } from './appActions'

export const handleBriefInfoSuccess = response => ({
  type: BRIEF_INFO_FETCH_DATA_SUCCESS,
  brief: response.data
})

export const handleBriefInfoFailure = response => ({
  type: BRIEF_INFO_HAS_ERRORED,
  // eslint-disable-next-line
  errorMessage: response && response.data ? response.data.message : 'unknown server error'
})

export const loadBrief = briefId => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: `/brief/${briefId}` }).then(response => {
    if (!response || response.error) {
      dispatch(handleBriefInfoFailure(response))
    } else {
      dispatch(handleBriefInfoSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const handleBriefResponseSuccess = () => ({ type: BRIEF_RESPONSE_SUCCESS })

export const handleBriefResponseFailure = response => {
  switch (response.status) {
    case 409:
      return {
        type: BRIEF_RESPONSE_DUPLICATE_FAILURE,
        // eslint-disable-next-line
        errorMessage: response.data ? response.data.message : 'a user with this email address already exists'
      }

    default:
      return {
        type: BRIEF_RESPONSE_FAILURE,
        // eslint-disable-next-line
        errorMessage: response.data ? response.data.message : 'unknown server error'
      }
  }
}

export const handleBriefResponseSubmit = (briefId, model) => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({
    url: `/brief/${briefId}/respond`,
    method: 'POST',
    data: JSON.stringify(model)
  }).then(response => {
    if (response.error) {
      dispatch(handleBriefResponseFailure(response))
    } else {
      dispatch(handleBriefResponseSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}
