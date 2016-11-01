const MESSAGE = 'error/message'
const REMOVE = 'error/remove'

export default function reducer(state = {}, action = {}) {
  const { type, key, value } = action
  switch (type) {
    case MESSAGE:
      return Object.assign({}, state, {
        [key]: value
      });
    case REMOVE:
      return Object.keys(state)
        .filter(k => k !== key)
        .reduce((result, current) => {
          result[current] = state[current];
          return result;
      }, {});
    default:
      return state;
  }
}

export const addMessage = (key, value) => ({ type: MESSAGE, key, value })
export const removeMessage = (key) => ({ type: REMOVE, key })
