import { titleMap } from '../../../../shared/Badges';

import { actionTypes as paginationActionTypes } from './pagination';

import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import findKey from 'lodash/findKey';

const UPDATE_ROLE     = 'search/role';
const UPDATE_TYPE     = 'search/type';
const UPDATE_KEYWORD  = 'search/keyword';
const UPDATE_SORT     = 'search/sort';
const UPDATE_VIEW     = 'search/view';
const SYNC_RESULTS    = 'search/results';
const PRE_SEARCH      = 'search/pre';
const RESET_QUERY     = 'search/reset';

const initialState = {
  role: {},
  type: {},
  sort_by: 'a-z',
  view: 'sellers',
  keyword: '',
  results: [],
  products: [],
  querying: false
}

const removeFromObject = (object, predicate) => {
  return Object.keys(object)
    .filter(predicate)
    .reduce((result, key) => {
      return { ...result, [key]: object[key] }
    }, {});
}

export const scrubState = (state) => {
  let result = ['results', 'querying'].reduce((obj, key) => {
    return removeFromObject(obj, (k) => key !== k)
  }, state);

  if (isEmpty(result.keyword)) {
    result = removeFromObject(result, (k) => k !== 'keyword')
  }

  return Object.keys(result).reduce((obj, key) => {
    let target = obj[key];
    let pruned = target;
    if (isObject(target)) {
      pruned = removeFromObject(target, (k) => target[k]);
    }

    return { ...obj, [key]: pruned }
  }, result);
}

export const falseValues = (target) => {

  if (isObject(target)) {
    return Object
      .keys(target)
      .reduce((result, key) => {
        return { ...result, [key]: false }
      }, {});
  }

  return false;
}

export const convertTypes = (query) => {
  if (isEmpty(query.type)) {
    return query;
  }

  let mappedTypes = Object
    .keys(query.type)
    .map(value => findKey(titleMap, (o) => o === value))
    .reduce((object, type) => {
      return { ...object, [type]: true}
    }, {});

  return { ...query, type: mappedTypes }
}

export const buildQueryString = ({ search = {}, pagination = {} } = {}) => {
  // Scrub results and querying from query, not valid filters.
  let query = { ...scrubState(search), ...pagination }

  // Map type pretty names back to their keys.
  query = convertTypes(query);

  return Object.keys(query).reduce((q, key) => {
    let target = query[key];
    let params = [];
    if (isObject(target)) {
      params = Object.keys(target).map((param) => `${key}=${param}`);
    } else {
      params = [`${key}=${target}`];
    }
    return q.concat(params);
  }, []);
}

export default function reducer(state = initialState, action = {}) {
  const { result, type: actionType, value } = action;
  switch (actionType) {
    case UPDATE_ROLE:
      const role = {
        ...state.role,
        [value]: !state.role[value]
      };
      
      return { ...state, role };
    case UPDATE_TYPE:
      const type = {
        ...state.type,
        [value]: !state.type[value]
      };
      
      return { ...state, type };
    case UPDATE_KEYWORD:
      return { ...state, keyword: value };
    case UPDATE_SORT:
      return { ...state, sort_by: value };
    case UPDATE_VIEW:
      return { ...state, view: value };
    case PRE_SEARCH:
      return {
        ...state,
        querying: true
      };
    case SYNC_RESULTS:
      const { results } = result.search;
      return {
        ...state,
        results,
        querying: false
      }
    case RESET_QUERY:
      const  { keyword, sort_by, view } = initialState;
      return {
        ...state,
        role: falseValues(state.role),
        type: falseValues(state.type),
        keyword,
        sort_by,
        view
      }
    default:
      return { ...initialState, ...state }
  }
}

export const syncResult = (result) => ({ type: SYNC_RESULTS, result });
export const preSearch = () => ({ type: PRE_SEARCH });

export const search = (type, value, options = {}) => {
  return (dispatch, getState, { api, debounceQueue, router }) => {
    const { doSearch = true } = options;


    dispatch(preSearch());
    // Update either role, type or keyword.
    dispatch({ type, value });

    if (!doSearch) {
      return Promise.resolve();
    }

    const deb = debounce(() => {
      let { search, form_options = {}, pagination } = getState();

      // If we aren't explicitly pressing pagination
      // Don't pass pagination.
      if (type !== paginationActionTypes.UPDATE_PAGE) {
        pagination = {}
      } else {
        pagination = { page: pagination.page }
      }

      let queryArray = buildQueryString({ search, pagination });
      let searchString = queryArray.join('&');

      router.push({
        search: `?${searchString}`
      });

      return api(`${form_options.action}?${searchString}`, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(json => dispatch(syncResult(json)));
    }, 500);

    // Cancel queued requests and enqueue the latest one
    debounceQueue.cancelAll();
    debounceQueue.add(deb);
    deb();

    return Promise.resolve();
  }
}

export const updateRole    = (e)       => search(UPDATE_ROLE, e.target.value);
export const updateType    = (e)       => search(UPDATE_TYPE, e.target.value);
export const updateKeyword = (value)   => search(UPDATE_KEYWORD, value);
export const updateSort    = (e)       => search(UPDATE_SORT, e.target.value);
export const resetQuery    = (options) => search(RESET_QUERY, options);

export const updateView = (value) => {
  return (dispatch, getState, { router }) => {
    dispatch({ type: UPDATE_VIEW, value });

    const { search } = getState();

    let query = buildQueryString({ search });

    router.push({
      search: `?${query.join('&')}`
    })
  }
}

export const actionCreators = {
 updateRole,
 updateType,
 updateKeyword,
 updateSort,
 updateView,
 resetQuery,
 search
};

export const actionTypes = {
  UPDATE_ROLE,
  UPDATE_TYPE,
  UPDATE_KEYWORD,
  UPDATE_SORT,
  UPDATE_VIEW,
  SYNC_RESULTS,
  PRE_SEARCH,
  RESET_QUERY
};