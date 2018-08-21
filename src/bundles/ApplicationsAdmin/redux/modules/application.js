export const APP_LOADED = 'APP_LOADED';
export const APP_SAVED = 'APP_SAVED';
export const APP_FAILED = 'APP_FAILED';

export default function reducer(state = {}, action = {}) {
  const { type, data } = action;
  switch (type) {
    case APP_FAILED:
      return Object.assign({}, data.application, {
        error: data.error
      });
    case APP_SAVED:
      return Object.assign({}, {
        data: data.application,
        jsonData: JSON.stringify(data.application, null, ' ')
      });
    default:
      return Object.assign({}, {
        data: state,
        jsonData: JSON.stringify(state, null, ' '),
        error: false
      });
  }
}


export const appSaved = (data) => ({ type: APP_SAVED, data });
export const appSaveFailed = (data) => ({ type: APP_FAILED, data });

export const appSave = (application) => {
  return (dispatch, getState, api) => {
    const state = getState();

    try {
      JSON.parse(application.jsonData);
    } catch (e) {
      return dispatch(appSaveFailed({
        error: e.message,
        application: application
      }));
    }
    return api(state.meta.url_app_update, {
      method: 'POST',
      body: JSON.stringify(application.jsonData),
      headers: {
        // Flask expects the token as a header.
        'X-CSRFToken': state.form_options.csrf_token
      }
    })
      .then((response) => {
        if (response.status != 200) {
          return response
            .text()
            .then((text) => {
              return dispatch(appSaveFailed({
                error: text,
                application: application
              }));
            });
        }
        return response
          .json()
          .then((json) => {
            if (json.errors) {
              return dispatch(appSaveFailed({
                error: json.errors.map(i=>i.message).join('<br/>'),
                application: application
              }));
            } else {
              return dispatch(appSaved(json));
            }
          })
      })
  }
};