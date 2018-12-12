export const CASESTUDY_STATUS_UPDATE_FAILED = 'CASESTUDY_STATUS_UPDATE_FAILED';

export const casestudyStatusUpdateFailed = (data) => ({ type: CASESTUDY_STATUS_UPDATE_FAILED, data });

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export const updateCaseStudyStatus = (casestudy_id, status) => {
  return (dispatch, getState, api) => {
    const state = getState();
    let { 
      casestudy
    } = state;

    let toSave = {
      casestudy_id,
      status
    }
    return api(state.meta.url_case_study_status_update[casestudy_id], {
      method: 'PUT',
      body: JSON.stringify(toSave),
      headers: {
        'X-CSRFToken': state.form_options.csrf_token
      }
    })
    .then((response) => {
      if (response.status != 200) {
        return response
          .text()
          .then((text) => {
            return dispatch(casestudyStatusUpdateFailed({
              error: text
            }));
          });
      }
      return response
        .json()
        .then((json) => {
          if (json.errors) {
            return dispatch(casestudyStatusUpdateFailed({
              error: json.errors.map(i=>i.message).join('<br/>')
            }));
          } else {
            document.location.reload()
          }
        })
    })
  }
};
