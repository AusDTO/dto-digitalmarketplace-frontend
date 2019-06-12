export default function reducer(state, action = {}) {
  const { payload } = action;
  if (payload) {
    return payload.agreement;
  } else {
    return state ? state: {};
  }
}
