import format from 'date-fns/format'

const ADMIN_DOWNLOADED_REPORT = 'ADMIN_DOWNLOADED_REPORT';

export default function reducer(state = {}, action = {}) {
  const { type } = action

  switch (type) {
    case ADMIN_DOWNLOADED_REPORT:
      return state
    default:
      return state;
  }
}

const downloadedReport = () => ({ type: ADMIN_DOWNLOADED_REPORT });

const downloadFile = (response, reportType) => {
  response.blob()
  .then(blob => {
    const url = URL.createObjectURL(blob)
    const timestamp = format(new Date(), 'YYYY-MM-DD-HHmmssSSS')
    const link = document.createElement('a')
    link.href = url
    link.download = `seller-${reportType}-${timestamp}.csv`
    link.click()
    URL.revokeObjectURL(url)
  })
}

export const downloadReport = reportType => {
  return (dispatch, getState, api) => {
    const state = getState()
    const url = new URL(state.meta.downloadUrl)
    url.search = new URLSearchParams(`reportType=${reportType}`)

    return api(url, {
      method: 'GET'
    })
    .then(response => downloadFile(response, reportType))
    .then(() => dispatch(downloadedReport()))
  }
}
