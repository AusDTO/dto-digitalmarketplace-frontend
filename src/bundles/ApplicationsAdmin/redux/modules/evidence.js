export const APPROVED_EVIDENCE = 'APPROVED_EVIDENCE';
export const REJECTED_EVIDENCE = 'REJECTED_EVIDENCE';

export default function reducer(state = {}, action = {}) {
  const { type, evidence } = action;
  switch (type) {
    case APPROVED_EVIDENCE:
      return [...state, evidence]
    case REJECTED_EVIDENCE:
      return [...state, evidence]
    default:
      return state;
  }
}

export const approvedEvidence = (id) => ({ type: APPROVED_EVIDENCE, id });

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
    .then((json) => {
      dispatch(approvedEvidence(id))
    })
  }
};

export const rejectedEvidence = (id, message) => ({ type: REJECTED_EVIDENCE, id, message });

export const rejectEvidence = (id, message) => {
    return (dispatch, getState, api) => {
        const state = getState();
        return api(state.meta.url_reject, {
            method: 'POST',
            body: JSON.stringify({application_id: id, message: message}),
            headers: {
                // Flask expects the token as a header.
                'X-CSRFToken': state.form_options.csrf_token
            }
        })
            .then((response) => response.json())
            .then((json) => {
                dispatch(rejectedEvidence(id))
            })
    }
};