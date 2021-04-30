export default function reducer(state = {}, action = {}) {
    const { type } = action;
    switch (type) {
      default:
        return state;
    }
  }
  
  export const downloadReports = data => {
    return (dispatch, getState, api) => {
      const state = getState();
      return api(state.meta.url_download_reports, {
        method: 'POST',
        body: {'report_type': data}
      })
    }
  };
  