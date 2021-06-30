import { SENDING_REQUEST } from '../constants/constants'
import dmapi from '../services/apiClient'

export const sendingRequest = sending => ({ type: SENDING_REQUEST, sending })

export const downloadReports = (reportType, data) => (dispatch, getState) => {
  dispatch(sendingRequest(true))
  return dmapi({
    url: `/downloadReports/${reportType}`,
    method: 'PATCH',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  })
}
