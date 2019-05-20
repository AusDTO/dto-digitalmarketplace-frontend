import { SAVE_TEAM_SUCCESS } from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { sendingRequest, setErrorMessage } from './appActions'

export const handleSaveTeamSuccess = response => ({
  type: SAVE_TEAM_SUCCESS,
  team: response.data.team
})

export const saveTeam = data => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/team/create`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getState().app.csrfToken
    },
    data: JSON.stringify(data)
  }).then(response => {
    if (!response || response.error) {
      const errorMessage = response.data.message ? response.data.message : GENERAL_ERROR
      dispatch(setErrorMessage(errorMessage))
    } else {
      dispatch(handleSaveTeamSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}
