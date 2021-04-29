export default function reducer(state = {}, action = {}) {
    const { type } = action;
    switch (type) {
      default:
        return state;
    }
  }
  
  export const downloadReports = data => {
    console.log('eeeeeeeeeee')
    console.log(data)
    console.log('qqqqq')
    return (dispatch, getState, api) => {
      const state = getState();
      console.log('stateeeee')
      console.log(state.meta)
      console.log(data)
      return api(state.meta.url_download_reports, {
        method: 'POST',
        body: {'report_type': data}
      })
    }
  };
  