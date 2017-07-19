/*  global ENV  */
import axios from 'axios'

const memberUrl = 'api/ping'
const logoutUrl = '/logout'
/**
 * [fetchMemberInfo description]
 * @return {Object}           respnose object with error and fetched data
 */
const fetchMemberInfo = () => {
  return axios({
    baseURL: 'http://localhost:8000',
    url: memberUrl,
    timeout: 20000,
    method: 'GET',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    },
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
    url: logoutUrl,
    timeout: 20000,
    method: 'POST',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    },
    validateStatus: (status) => status === 200
  })
  .then(response => {
    return { error: null, response }
  })
  .catch(response => {
    return { error: response.error || 'error logging out member', response: null }
  })
}

export default {
  fetchMemberInfo
}
