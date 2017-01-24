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

const removeFromObject = (object, keyToRemove) => {
  return Object.keys(object)
    .filter((key) => {
      return keyToRemove !== key;
    })
    .reduce((result, key) => {
      return { ...result, [key]: object[key] }
    }, {});
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_ROLE:
      let roles = {}
      if (action.value in state.role) {
        roles = removeFromObject(state.role, action.value);
      } else {
        roles = Object.assign({}, state.role, { [action.value]: true });  
      }
      
      return Object.assign({}, state, { role: roles });
    case UPDATE_TYPE: 
      let types = {}
      if (action.value in state.type) {
        types = removeFromObject(state.type, action.value);
      } else {
        types = Object.assign({}, state.type, { [action.value]: true });  
      }
      
      return Object.assign({}, state, { type: types });
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

    const { search, form_options = {} } = getState();
    // Scrub results and querying from query, not valid filters.
    let query = removeFromObject(search, 'results');
    query = removeFromObject(query, 'querying')

    return api(form_options.action, {
      body: JSON.stringify(query),
      method: 'POST',
      'Content-Type': 'application/json'
    })
    .then(res => res.json())
    .then(json => dispatch(syncResults(json)));
  }
}

export const updateRole = (e) => search(UPDATE_ROLE, e.target.value);
export const updateType = (e) => search(UPDATE_TYPE, e.target.value);
export const updateKeyword = (value) => search(UPDATE_KEYWORD, value);

const changeRole = (e) => {
  return (dispatch, getState, api) => {
    dispatch(updateRole(e));
    dispatch(search());
  }
}

export const actionCreators = {
 updateRole,
 updateType,
 updateKeyword,
 changeRole,
 search
};

export const actionTypes = {
  UPDATE_ROLE,
  UPDATE_TYPE,
  UPDATE_KEYWORD,
  SYNC_RESULTS,
  PRE_SEARCH
};