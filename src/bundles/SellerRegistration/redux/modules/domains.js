export default function reducer(state, action = {}) {
  const { payload } = action;
  if (payload) {
    return payload.domains;
  } else {
    return state ? state: [];
  }
}
