const UPDATE_VIEW     = 'team/view';

const initialState = {
  view: "mybriefs",
  briefs: {
    all: [],
    closed: [],
    draft: [],
    live:[
      {
        responses: []
      }
    ]
  }
}

export default function reducer(state = initialState, action = {}) {
  const { type: actionType, value} = action;
  switch (actionType) {
    case UPDATE_VIEW:
      return { ...state, view: value };
    default:
      return { ...initialState, ...state }
  }
}


export const updateView = (value) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_VIEW, value });
  }
}

export const actionCreators = {
 updateView,
};

export const actionTypes = {
  UPDATE_VIEW,
};

