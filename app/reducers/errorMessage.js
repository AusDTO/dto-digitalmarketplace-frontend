export const MESSAGE = 'error/message'
export const REMOVE = 'error/remove'

export default function reducer(state = {}, action = {}) {
  const { type, key, value, id } = action
  switch (type) {
    case MESSAGE:
      return Object.assign({}, state, {
        [key]: Object.assign({}, value, { id })
      })
    case REMOVE:
      return Object.keys(state).filter(k => k !== key).reduce((result, current) => {
        result[current] = state[current]
        return result
      }, {})
    default:
      return state
  }
}

export const addMessage = (key, value, id) => ({
  type: MESSAGE,
  key,
  value,
  id
})
export const removeMessage = key => ({ type: REMOVE, key })
