import dmapi from '../services/apiClient'

export const loadBriefs = status => () => {
  return dmapi({
    url: `/buyer/dashboard`,
    params: { status: status }
  }).then(response => {
    return response
  })
}
