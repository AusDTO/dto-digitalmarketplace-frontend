const UPDATE_ROLE = 'query/update/role';
const UPDATE_TYPE = 'query/update/type';

const initialState = {
  role: {},
  type: {}
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
    default:
      return state;
  }
}

export const updateRole = (e) => ({ type: UPDATE_ROLE, value: e.target.value });
export const updateType = (e) => ({ type: UPDATE_TYPE, value: e.target.value });

export const actionCreators = {
 updateRole,
 updateType
};

export const actionTypes = {
  UPDATE_ROLE,
  UPDATE_TYPE
};