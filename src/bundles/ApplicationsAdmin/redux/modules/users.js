export const MOVED_USER = 'MOVED_USER';
export const INVITED_USER = 'INVITED_USER';

export default function reducer(state = {}, action = {}) {
  const { type, user } = action;
  switch (type) {
    case MOVED_USER:
      return [...state, user];
    case INVITED_USER:
      return [...state, Object.assign({}, {invited: true}, user)];
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

export const invitedUser = (user) => ({type: INVITED_USER, user});

export const inviteUser = (user) => {
  return (dispatch, getState, api) => {
    const state = getState();

    return api(state.meta.url_invite_user, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        // Flask expects the token as a header.
        'X-CSRFToken': state.form_options.csrf_token
      }
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return dispatch(invitedUser(user));
        }
        
        var error = new Error(response.statusText);
        error.response = response;
        throw error;        
      })
      .catch((err) => {
        console.log(err);
      })
  }
};
