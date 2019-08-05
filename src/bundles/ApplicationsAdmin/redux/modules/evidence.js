export const APPROVED_EVIDENCE = 'APPROVED_EVIDENCE';
export const REJECTED_EVIDENCE = 'REJECTED_EVIDENCE';

export default function reducer(state = {}, action = {}) {
  const { type } = action;
  switch (type) {
    case APPROVED_EVIDENCE:
      return state
    case REJECTED_EVIDENCE:
      return state
    default:
      return state;
  }
}

export const approvedEvidence = () => ({ type: APPROVED_EVIDENCE });

export const approveEvidence = (id) => {
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
    .then(() => dispatch(approvedEvidence()))
  }
};

export const rejectedEvidence = () => ({ type: APPROVED_EVIDENCE });

export const rejectEvidence = (id, failed_criteria, vfm) => {
  return (dispatch, getState, api) => {
    const state = getState();
    return api(state.meta.url_reject, {
      method: 'POST',
      body: JSON.stringify({id, failed_criteria, vfm}),
      headers: {
        // Flask expects the token as a header.
        'X-CSRFToken': state.form_options.csrf_token
      }
    })
    .then((response) => response.json())
    .then(() => dispatch(rejectedEvidence()))
  }
};