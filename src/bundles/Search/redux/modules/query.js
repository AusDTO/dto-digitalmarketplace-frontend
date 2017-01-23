const UPDATE_ROLE     = 'query/role';
const UPDATE_TYPE     = 'query/type';
const UPDATE_KEYWORD  = 'query/keyword';

const initialState = {
  role: {},
  type: {},
  keyword: ''
}

const removeFromObject = (object, keyToRemove) => {
  return Object.keys(object)
    .filter((key) => {
      return keyToRemove !== key;
    })
    .reduce((result, key) => {
      result[key] = true;
      return result;
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
    default:
      return state;
  }
}

export const updateRole = (e) => ({ type: UPDATE_ROLE, value: e.target.value });
export const updateType = (e) => ({ type: UPDATE_TYPE, value: e.target.value });
export const updateKeyword = (value) => ({ type: UPDATE_KEYWORD, value });

export const actionCreators = {
 updateRole,
 updateType,
 updateKeyword
};

export const actionTypes = {
  UPDATE_ROLE,
  UPDATE_TYPE,
  UPDATE_KEYWORD
};