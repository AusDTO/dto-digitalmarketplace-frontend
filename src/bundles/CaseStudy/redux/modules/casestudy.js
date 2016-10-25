const ADD = 'casestudies/ADD'
const INIT = 'casestudies/INIT'

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  const { type } = action
  switch (type) {
    default:
      return state;
  }
}

export const addStudy = (title, link) => ({ type: ADD, title, link })
export const initList = (title, link) => ({ type: INIT })
