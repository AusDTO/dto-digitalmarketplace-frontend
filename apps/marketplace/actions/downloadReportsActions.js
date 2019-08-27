import dmapi from '../services/apiClient'

const submitDownloadReportsRequest = values => (dispatch, getState) =>
  dmapi({
    url: `/buyer/download/reports`,
    method: 'GET',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    params: values
  })

export default submitDownloadReportsRequest
