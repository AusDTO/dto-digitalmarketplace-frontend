import { search, actionTypes as searchActionTypes } from './search';

const UPDATE_PAGE = 'pagination/page';

const initialState = {
  pages: [],
  page: 1,
  pageCount: 1
};

export default function reducer(state = initialState, action = {}) {
  const { type, result, value } = action;
  switch (type) {
    case UPDATE_PAGE:
      return { ...state, page: value }
    case searchActionTypes.SYNC_RESULTS:
      return {
        ...state,
        ...result.pagination
      }
    default:
      return Object.assign({}, initialState, state);
  }
}

export const updatePage = (router, value) => search(UPDATE_PAGE, value, router);

export const actionCreators = {
 updatePage
};

export const actionTypes = {
  UPDATE_PAGE
};