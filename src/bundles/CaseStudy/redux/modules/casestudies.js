const ADD = 'casestudies/ADD'
const INIT = 'casestudies/INIT'

const initialState = {
  studies: [],
  added: false
};

export default function reducer(state = initialState, action = {}) {
  const { type, title, link } = action
  switch (type) {
    case ADD:
      return {
        added: true,
        studies: state.studies.concat({ title, link })
      }
    case INIT:
     return {
       ...state,
       added: false
     }
    default:
      return state;
  }
}

export const addStudy = (title, link) => ({ type: ADD, title, link })
export const initList = (title, link) => ({ type: INIT })
