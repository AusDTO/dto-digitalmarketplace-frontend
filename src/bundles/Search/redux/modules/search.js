import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

const UPDATE_ROLE     = 'search/role';
const UPDATE_TYPE     = 'search/type';
const UPDATE_KEYWORD  = 'search/keyword';
const SYNC_RESULTS    = 'search/results';
const PRE_SEARCH      = 'search/pre';

const initialState = {
  role: {},
  type: {},
  keyword: '',
  results: [],
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

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_ROLE:
      const role = {
        ...state.role,
        [action.value]: !state.role[action.value]
      };
      
      return Object.assign({}, state, { role });
    case UPDATE_TYPE:
      const type = {
        ...state.type,
        [action.value]: !state.type[action.value]
      };
      
      return Object.assign({}, state, { type });
    case UPDATE_KEYWORD:
      return Object.assign({}, state, { keyword: action.value });
    case PRE_SEARCH:
      return {
        ...state,
        querying: true
      };
    case SYNC_RESULTS:
      return {
        ...state,
        results: action.result,
        querying: false
      }
    default:
      return Object.assign({}, initialState, state);
  }
}

export const syncResults = (result) => ({ type: SYNC_RESULTS, result });
export const preSearch = () => ({ type: PRE_SEARCH });

export const search = (type, value) => {
  return (dispatch, getState, api) => {
    dispatch(preSearch());
    // Update either role, type or keyword.
    dispatch({ type, value });

    // Only on keyword would length be blocking.
    // TODO Arbitary number
    if (type === UPDATE_KEYWORD && value.length < 4) {
      return false;
    }

    debounce(() => {
      const { search, form_options = {} } = getState();
      // Scrub results and querying from query, not valid filters.
      let query = scrubState(search);

      let string = Object.keys(query).reduce((q, key) => {
        let target = query[key];
        let result;
        if (isObject(target)) {
          result = Object.keys(target).map((param) => `${key}=${param}`).join('&');
        } else {
          result = `${key}=${target}`;
        }
        return q += result;
      }, '');

      return api(`${form_options.action}?${string}`, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(json => dispatch(syncResults(json.results)));
    }, 500)();
  }
}

export const updateRole = (e) => search(UPDATE_ROLE, e.target.value);
export const updateType = (e) => search(UPDATE_TYPE, e.target.value);
export const updateKeyword = (value) => search(UPDATE_KEYWORD, value);

export const actionCreators = {
 updateRole,
 updateType,
 updateKeyword,
 search
};

export const actionTypes = {
  UPDATE_ROLE,
  UPDATE_TYPE,
  UPDATE_KEYWORD,
  SYNC_RESULTS,
  PRE_SEARCH
};