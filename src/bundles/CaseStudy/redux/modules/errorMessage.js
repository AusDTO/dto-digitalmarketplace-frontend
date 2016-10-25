const MESSAGE = 'error/message'
const REMOVE = 'error/remove'

export default function reducer(state = {}, action = {}) {
  const { type, key, value } = action
  switch (type) {
    case MESSAGE:
      state[key] = value;
      return state;
    case REMOVE:
      if (key in state) {
        delete state[key];
      }
      return state;
    default:
      return state;
  }
}

export const addMessage = (key, value) => ({ type: MESSAGE, key, value })
export const removeMessage = (key) => ({ type: REMOVE, key })
