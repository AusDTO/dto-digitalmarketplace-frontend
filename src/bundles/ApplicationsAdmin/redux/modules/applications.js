export const CONVERTED_SELLER = 'CONVERTED_SELLER';

export default function reducer(state = {}, action = {}) {
  const { type, id } = action;
  switch (type) {
    case CONVERTED_SELLER:
      const applicationIndex = state.map(app => app.id).indexOf(id);
      const updatedApplication = Object.assign({}, state[applicationIndex], {
        status: 'approved'
      });

      return state
        .slice(0, applicationIndex)
        .concat(updatedApplication, state.slice(applicationIndex + 1, state.length))
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
