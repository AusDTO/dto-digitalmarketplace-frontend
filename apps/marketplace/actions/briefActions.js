import { BRIEF_INFO_FETCH_DATA_SUCCESS, BRIEF_RESPONSE_SUCCESS } from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'

import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const handleBriefInfoSuccess = response => ({
  type: BRIEF_INFO_FETCH_DATA_SUCCESS,
  brief: response.data
})

export const handleErrorFailure = response => dispatch => {
  dispatch(
    setErrorMessage(
      response && response.data && response.data.errorMessage ? response.data.errorMessage : GENERAL_ERROR
    )
  )
}
export const loadBrief = briefId => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: `/brief/${briefId}` }).then(response => {
    if (!response || response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleBriefInfoSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}

export const handleBriefResponseSuccess = () => ({ type: BRIEF_RESPONSE_SUCCESS })

export const handleBriefResponseSubmit = (briefId, model) => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({
    url: `/brief/${briefId}/respond`,
    method: 'POST',
    data: JSON.stringify(model)
  }).then(response => {
    if (response.error) {
      dispatch(handleErrorFailure(response))
    } else {
      dispatch(handleBriefResponseSuccess(response))
    }
    dispatch(sendingRequest(false))
  })
}
