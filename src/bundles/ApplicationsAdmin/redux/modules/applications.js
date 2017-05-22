export const CONVERTED_SELLER = 'CONVERTED_SELLER';
export const REJECTED_APPLICATION = 'REJECTED_APPLICATION';
export const REVERTED_APPLICATION = 'REVERTED_APPLICATION';

const updateApplicationRowStatus = (state, id, status) => {
  const applicationIndex = state.map(app => app.id).indexOf(id);
  const updatedApplication = Object.assign({}, state[applicationIndex], {
    status: status
  });

  return state
    .slice(0, applicationIndex)
    .concat(updatedApplication, state.slice(applicationIndex + 1, state.length))
}

export default function reducer(state = {}, action = {}) {
  const {type, id} = action;
  switch (type) {
    case CONVERTED_SELLER:
      return updateApplicationRowStatus(state, id, 'approved');
    case REJECTED_APPLICATION:
      return updateApplicationRowStatus(state, id, 'approval_rejected');
    case REVERTED_APPLICATION:
      return updateApplicationRowStatus(state, id, 'saved');
    default:
      return state;
  }
}

export const convertedSeller = (id) => ({type: CONVERTED_SELLER, id});

export const convertApplicationToSeller = (id) => {
  return (dispatch, getState, api) => {
    const state = getState();

    return api(state.meta.url_convert_to_seller, {
      method: 'POST',
      body: JSON.stringify({id}),
      headers: {
        // Flask expects the token as a header.
        'X-CSRFToken': state.form_options.csrf_token
      }
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(convertedSeller(id))
      })
  }
};


export const rejectedApplication = (id) => ({type: REJECTED_APPLICATION, id});

export const rejectApplication = (id) => {
  return (dispatch, getState, api) => {
    const state = getState();

    return api(state.meta.url_reject_application, {
      method: 'POST',
      body: JSON.stringify({id}),
      headers: {
        // Flask expects the token as a header.
        'X-CSRFToken': state.form_options.csrf_token
      }
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(rejectedApplication(id))
      })
  }
};

export const revertedApplication = (id) => ({type: REVERTED_APPLICATION, id});

export const revertApplication = (id, msg) => {
  return (dispatch, getState, api) => {
    const state = getState();
    return api(state.meta.url_revert_application, {
      method: 'POST',
      body: JSON.stringify({id, msg}),
      headers: {
        'X-CSRFToken': state.form_options.csrf_token
      }
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(revertedApplication(id))
      })
  }
};
