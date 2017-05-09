export const APPROVED_ASSESSMENT = 'APPROVED_ASSESSMENT';

const updateAssessmentRow = (state, id, status) => {
  const assessmentIndex = state && state.map(app => app.id).indexOf(id);
  const updatedAssessment = Object.assign({}, state[assessmentIndex]['supplier_domain'], {
        status: status
    });
    return state
        .slice(0, assessmentIndex)
        .concat(updatedAssessment, state.slice(assessmentIndex + 1, state.length))
}

export default function reducer(state = {}, action = {}) {
  const { type, id } = action;
  switch (type) {
    case APPROVED_ASSESSMENT:
      return updateAssessmentRow(state, id, 'assessed');
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
