export const CONVERTED_SELLER = 'CONVERTED_SELLER';
export const REJECTED_APPLICATION = 'REJECTED_APPLICATION';
export const REVERTED_APPLICATION = 'REVERTED_APPLICATION';
export const RESET_APPLICATIONS = 'RESET_APPLICATIONS';
export const DELETED_APPLICATION = 'DELETE_APPLICATION';

const updateApplicationRowStatus = (state, id, status, revertStatus) => {
  const applicationIndex = state.map(app => app.id).indexOf(id);
  const updatedApplication = Object.assign({}, state[applicationIndex], {
    status: status,
  });
  updatedApplication.revertStatus = revertStatus;

  return state
    .slice(0, applicationIndex)
    .concat(updatedApplication, state.slice(applicationIndex + 1, state.length))
};

export default function reducer(state = {}, action = {}) {
  const { type, id, revertStatus, applications } = action;
  switch (type) {
    case CONVERTED_SELLER:
      return updateApplicationRowStatus(state, id, 'approved');
    case REJECTED_APPLICATION:
      return updateApplicationRowStatus(state, id, 'approval_rejected');
    case DELETED_APPLICATION:
      return updateApplicationRowStatus(state, id, 'deleted');
    case REVERTED_APPLICATION:
      return updateApplicationRowStatus(state, id, 'saved', revertStatus);
    case RESET_APPLICATIONS:
      return applications.slice();
    default:
      return state;
  }
}

export const convertedSeller = (id) => ({ type: CONVERTED_SELLER, id });

export const convertApplicationToSeller = (id) => {
  return (dispatch, getState, api) => {
    const state = getState();

    return api(state.meta.url_convert_to_seller, {
      method: 'POST',
      body: JSON.stringify({ id }),
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


export const rejectedApplication = (id) => ({ type: REJECTED_APPLICATION, id });

export const rejectApplication = (id) => {
  return (dispatch, getState, api) => {
    const state = getState();

    return api(state.meta.url_reject_application, {
      method: 'POST',
      body: JSON.stringify({ id }),
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

export const revertedApplication = (id, revertStatus) => ({ type: REVERTED_APPLICATION, id, revertStatus });

export const revertApplication = (id, msg) => {
  return (dispatch, getState, api) => {
    const state = getState();
    return api(state.meta.url_revert_application, {
      method: 'POST',
      body: JSON.stringify({ id, msg }),
      headers: {
        'X-CSRFToken': state.form_options.csrf_token,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        let revertStatus = (response.status !== 200 ? false : true);
        if (revertStatus) {
          dispatch(revertedApplication(id, revertStatus))
        }
      })
  }
};

export const resetApplications = (applications) => ({ type: RESET_APPLICATIONS, applications });

export const searchApplications = (keyword) => {
  return (dispatch, getState, api) => {
    const state = getState();

    if (keyword.length < 3) {
      return dispatch(resetApplications([]))
    }

    return api(`${state.meta.url_search_applications}${keyword}`, {
      method: 'GET',
      headers: {
        'X-CSRFToken': state.form_options.csrf_token,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(resetApplications(json.applications))
      })
  }
};

export const deletedApplication = (id) => ({ type: DELETED_APPLICATION, id });

export const deleteApplication = (id) => {
  return (dispatch, getState, api) => {
    const state = getState();

    return api(`${state.meta.url_delete_application.slice(0, -1)}${id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': state.form_options.csrf_token,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(deletedApplication(id))
      })
  }
};

