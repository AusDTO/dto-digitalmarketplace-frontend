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

export const downloadReport = reportType => {
  return (dispatch, getState, api) => {
    const state = getState()
    const url = new URL(state.meta.downloadUrl)
    url.search = new URLSearchParams(`reportType=${reportType}`)

    return api(url, {
      method: 'GET'
    })
    .then(() => dispatch(downloadedReport()))
  }
}
