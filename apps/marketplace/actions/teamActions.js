import { BUYER_TEAM_MEMBERS_SUCCESS, USER_ORGANISATION } from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { clearErrorMessages, sendingRequest, setErrorMessage } from './appActions'

export const handleTeamActionSuccess = (data, type) => ({ data, type })

export const loadBuyerTeamMembers = (endpoint = '/dashboard/team/overview') => dispatch => {
  dispatch(sendingRequest(true))
  dmapi({ url: endpoint }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      response.data.loadedAt = new Date().valueOf()
      dispatch(clearErrorMessages())
      dispatch(handleTeamActionSuccess(response.data.organisation, USER_ORGANISATION))
      dispatch(handleTeamActionSuccess(response.data, BUYER_TEAM_MEMBERS_SUCCESS))
    }
    dispatch(sendingRequest(false))
  })
}
