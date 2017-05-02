export const APPROVED_ASSESSMENT = 'APPROVED_ASSESSMENT';

const removeAssessmentRow = (state, id) => {
  const assessmentIndex = state && state.map(app => app.id).indexOf(id);
  return state
    .slice(0, assessmentIndex)
    .concat(state.slice(assessmentIndex + 1, state.length));
}

export default function reducer(state = {}, action = {}) {
  const { type, id } = action;
  switch (type) {
    case APPROVED_ASSESSMENT:
      return state;
      // don't remove rows as it makes the UI move around
      // return removeAssessmentRow(state, id);
    default:
      return state;
  }
}

export const approvedAssessment = (id) => ({ type: APPROVED_ASSESSMENT, id });

export const approveAssessment = (id) => {
  return (dispatch, getState, api) => {
    const state = getState();
    return api(state.meta.url_approve, {
      method: 'POST',
      body: JSON.stringify({id}),
      headers: {
        // Flask expects the token as a header.
        'X-CSRFToken': state.form_options.csrf_token
      }
    })
    .then((response) => response.json())
    .then((json) => {
      dispatch(approvedAssessment(id))
    })
  }
};
