import {
  BUYER_TEAM_MEMBERS_SUCCESS,
  CREATE_TEAM_SUCCESS,
  GET_TEAM_SUCCESS,
  SAVE_TEAM_SUCCESS,
  TEAMS_OVERVIEW_SUCCESS,
  USER_ORGANISATION
} from '../constants/constants'
import { GENERAL_ERROR } from '../constants/messageConstants'
import dmapi from '../services/apiClient'
import { clearErrorMessages, sendingRequest, setErrorMessage } from './appActions'

export const handleCreateTeamSuccess = response => ({
  type: CREATE_TEAM_SUCCESS,
  team: response.data
})

export const createTeam = () => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: '/team/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getState().app.csrfToken
    }
  }).then(response => {
    if (!response || response.error) {
      const errorMessage = response.data.message ? response.data.message : GENERAL_ERROR
      dispatch(setErrorMessage(errorMessage))
    } else {
      dispatch(handleCreateTeamSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleGetTeamSuccess = response => ({
  type: GET_TEAM_SUCCESS,
  team: response.data
})

export const getTeam = teamId => dispatch => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/team/${teamId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (!response || response.error) {
      const errorMessage = response.data.message ? response.data.message : GENERAL_ERROR
      dispatch(setErrorMessage(errorMessage))
    } else {
      dispatch(handleGetTeamSuccess(response))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleSaveTeamSuccess = response => ({
  type: SAVE_TEAM_SUCCESS,
  team: response.data.team
})

export const saveTeam = team => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  dispatch(setErrorMessage(null))
  return dmapi({
    url: `/team/${team.id}/update`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getState().app.csrfToken
    },
    data: JSON.stringify(team)
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

export const findTeamMember = (keywords, exclude) => dispatch => {
  const params = { keywords, exclude: exclude ? exclude.join(',') : '' }

  dispatch(sendingRequest(true))
  return dmapi({
    url: '/team/members/search',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    params
  }).then(response => {
    if (!response || response.error) {
      const errorMessage = response.data.message ? response.data.message : GENERAL_ERROR
      dispatch(setErrorMessage(errorMessage))
    } else {
      return response.data
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const handleTeamActionSuccess = (data, type) => ({ data, type })

export const loadBuyerTeams = (endpoint = '/teams') => dispatch => {
  dispatch(sendingRequest(true))
  return dmapi({ url: endpoint }).then(response => {
    if (!response || response.error) {
      dispatch(setErrorMessage(GENERAL_ERROR))
    } else {
      dispatch(clearErrorMessages())
      dispatch(handleTeamActionSuccess(response.data, TEAMS_OVERVIEW_SUCCESS))
    }
    dispatch(sendingRequest(false))
    return response
  })
}

export const loadBuyerTeamMembers = (endpoint = '/people') => dispatch => {
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

export const requestAccess = permission => (dispatch, getState) =>
  dmapi({
    url: `/team/request-access`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      permission
    })
  })

export const requestToJoin = teamId => (dispatch, getState) =>
  dmapi({
    url: `/team/${teamId}/request-join`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    }
  })

export const getJoinRequests = () => () =>
  dmapi({
    url: '/team/join-requests',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

export const getJoinRequest = (teamId, token) => () =>
  dmapi({
    url: `/team/join-request/${teamId}/${token}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

export const declineRequestToJoin = (teamId, token, reason) => (dispatch, getState) =>
  dmapi({
    url: `/team/decline-join-request/${teamId}/${token}`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      reason
    })
  })
