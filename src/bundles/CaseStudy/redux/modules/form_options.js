const STEP = 'navigate/step'

const initialState = {
  mode: 'add',
  errors: []
}

export default function reducer(state = initialState, action = {}) {
  const { type, value } = action
  switch (type) {
    case STEP:
      return Object.assign({}, state, {
        step: value
      });
    default:
      return Object.assign({}, initialState, state);
  }
}

export const navigateStep = (value) => ({ type: STEP, value })
