import {
  DATA_IS_LOADING,
  BRIEF_INFO_FETCH_DATA_SUCCESS,
  BRIEF_INFO_HAS_ERRORED,
  BRIEF_RESPONSE_SUCCESS,
  BRIEF_RESPONSE_FAILURE,
  BRIEF_RESPONSE_DUPLICATE_FAILURE
} from '../constants/constants'

import dmapi from '../services/apiClient'

export function handleDataLoading(bool) {
  return {
    type: DATA_IS_LOADING,
    isLoading: bool
  }
}

export function handleBriefInfoSuccess(response) {
  return {
    type: BRIEF_INFO_FETCH_DATA_SUCCESS,
    brief: response.data
  }
}

export function handleBriefInfoFailure(response) {
  return {
    type: BRIEF_INFO_HAS_ERRORED,
    // eslint-disable-next-line
    errorMessage: response && response.data ? response.data.message : 'unknown server error'
  }
}

export function loadBrief(brief_id) {
  return dispatch => {
    dispatch(handleDataLoading(true))
    dmapi({ url: `/brief/${brief_id}` }).then(response => {
      if (!response || response.error) {
        dispatch(handleBriefInfoFailure(response))
      } else {
        dispatch(handleBriefInfoSuccess(response))
      }
      dispatch(handleDataLoading(false))
    })
  }
}

export function handleBriefResponseSuccess() {
  return {
    type: BRIEF_RESPONSE_SUCCESS
  }
}

export function handleBriefResponseFailure(response) {
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

export function handleBriefResponseSubmit(brief_id, model) {
  return dispatch => {
    dispatch(handleDataLoading(true))
    dmapi({
      url: `/brief/${brief_id}/respond`,
      method: 'POST',
      data: JSON.stringify(model)
    }).then(response => {
      if (response.error) {
        dispatch(handleBriefResponseFailure(response))
      } else {
        dispatch(handleBriefResponseSuccess(response))
      }
      dispatch(handleDataLoading(false))
    })
  }
}
