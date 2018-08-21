export const BRIEF_LOADED = 'BRIEF_LOADED';
export const BRIEF_SAVED = 'BRIEF_SAVED';
export const BRIEF_FAILED = 'BRIEF_FAILED';

export default function reducer(state = {}, action = {}) {
  const { type, data } = action;

  switch (type) {
    case BRIEF_FAILED:
      return Object.assign({}, data.brief, {
        error: data.error
      });
    case BRIEF_SAVED:
      return Object.assign({}, {
        data: data.brief,
        jsonData: JSON.stringify(data.brief, null, ' ')
      });
    default:
      return Object.assign({}, {
        data: state,
        jsonData: JSON.stringify(state, null, ' '),
        error: false
      });
  }
}


export const briefSaved = (data) => ({ type: BRIEF_SAVED, data });
export const briefSaveFailed = (data) => ({ type: BRIEF_FAILED, data });

export const briefSave = (brief) => {
  return (dispatch, getState, api) => {
    const state = getState();

    try {
      JSON.parse(brief.jsonData);
    } catch (e) {
      return dispatch(briefSaveFailed({
        error: e.message,
        brief: brief
      }));
    }
    return api(state.meta.url_brief_update, {
      method: 'POST',
      body: brief.jsonData,
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
              return dispatch(briefSaveFailed({
                error: text,
                brief: brief
              }));
            });
        }
        return response
          .json()
          .then((json) => {
            if (json.errors) {
              return dispatch(briefSaveFailed({
                error: json.errors.map(i=>i.message).join('<br/>'),
                brief: brief
              }));
            } else {
              return dispatch(briefSaved(json));
            }
          })
      })
  }
};