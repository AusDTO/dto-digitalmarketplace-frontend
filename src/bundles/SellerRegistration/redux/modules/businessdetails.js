const ADD = 'businessdetails/ADD'
const INIT = 'businessdetails/INIT'

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  const { type } = action
  switch (type) {
    default:
      return state;
  }
}

export const addDetails = (title, link) => ({ type: ADD, title, link })
export const initList = (title, link) => ({ type: INIT })
