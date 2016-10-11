const PREFETCH = 'sellers/PREFETCH'
const RECEIVE = 'sellers/RECEIVE'

const initialState = []

export default function reducer(state = initialState, action = {}) {
  const { type, sellers } = action
  switch (type) {
    case PREFETCH:
      return state
    case RECEIVE:
      return state.concat(sellers)
    default:
      return state;
  }
}

// Sync actions
export const prefetchSellers = () => ({ type: PREFETCH })
export const receiveSellers = (sellers) => ({ type: RECEIVE, sellers })

// Async actions
export const fetchSellers = () => {
  return (dispatch, getState, api) => {
    dispatch(prefetchSellers())
    return api('/suppliers')
     .then(r => r.json())
     .then(json => dispatch(receiveSellers(json.suppliers)))
  }
}
