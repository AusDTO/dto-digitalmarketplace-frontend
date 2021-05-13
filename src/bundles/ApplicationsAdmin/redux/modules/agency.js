export default function reducer(state = {}, action = {}) {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
}

export const saveAgency = data => {
  return (dispatch, getState, api) => {
    const state = getState();
    return api(state.meta.url_save_agency, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'X-CSRFToken': state.form_options.csrf_token
      }
    })
  }
};

export const loadAgencies = () => {
  return (dispatch, getState, api) => {
    const state = getState();
    return api(state.meta.url_agency_data, {
      method: 'GET'
    })
  }
};

export const createAgency = data => {
  console.log('createAgencyqqqqqq')
  return (dispatch, getState, api) => {
    const state = getState();
    return api(state.meta.url_create_agency, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'X-CSRFToken': state.form_options.csrf_token
      }
    })
  }
};
