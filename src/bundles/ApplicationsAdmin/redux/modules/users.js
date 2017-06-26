export const MOVED_USER = 'MOVED_USER';

export default function reducer(state = {}, action = {}) {
  const { type, user } = action;
  switch (type) {
    case MOVED_USER:
      return [...state, user];
    default:
      return state;
  }
}

export const movedUser = (user) => ({type: MOVED_USER, user});

export const moveUser = (email) => {
  return (dispatch, getState, api) => {
    const state = getState();

    return api(state.meta.url_move_existing_user, {
      method: 'POST',
      body: JSON.stringify(email),
      headers: {
        // Flask expects the token as a header.
        'X-CSRFToken': state.form_options.csrf_token
      }
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(movedUser(json.users))
      })
  }
};