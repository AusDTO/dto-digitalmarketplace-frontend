import { search } from './search';

const UPDATE_PAGE = 'pagination/page';

const initialState = {
  pages: [],
  page: 1,
  pageCount: 1
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_PAGE:
      return { ...state, page: action.value }
    default:
      return Object.assign({}, initialState, state);
  }
}

export const updatePage = (value) => search(UPDATE_PAGE, value);

export const actionCreators = {
 updatePage
};

export const actionTypes = {
  UPDATE_PAGE
};