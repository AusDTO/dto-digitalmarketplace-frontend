/*  global ENV  */
import axios from 'axios'


const memberUrl = '/api/ping'
const logoutUrl = '/logout'

const baseUrl = () => {
  if ( process.env.NODE_ENV === 'production') {
    return 'https://marketplace.service.gov.au'
  } else if (process.env.NODE_ENV === 'staging') {
    return 'https://dm-dev.apps.staging.digital.gov.au'
  } else {
    return 'http://localhost:8000'
  }
}
/**
 * [fetchMemberInfo description]
 * @return {Object}           respnose object with error and fetched data
 */
const fetchMemberInfo = (userSessionCookie) => {
  return axios({
    baseURL: baseUrl(),
    url: memberUrl,
    timeout: 20000,
    method: 'GET',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'dm_session=' + userSessionCookie + ';' 
    },
    withCredentials: true,
    validateStatus: (status) => status === 200
  })
  .then(response => {
    return { error: null, response: response.data }
  })
  .catch(response => {
    return { error: response.error || 'error fetching member info', response: null }
  })
}

const logoutMember = () => {
  return axios({
    baseURL: baseUrl(),
    url: logoutUrl,
    timeout: 20000,
    method: 'POST',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    validateStatus: (status) => status === 200
  })
  .then(response => {
    return { error: null, response: response }
  })
  .catch(response => {
    return { error: response.error || 'error logging out member', response: null }
  })
}

export default {
  fetchMemberInfo,
  logoutMember
}
