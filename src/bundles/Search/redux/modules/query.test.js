import reducer, { actionTypes, actionCreators as actions } from './query';

test('reducer should return initial state', () => {
  expect(reducer()).toEqual({
    role: {},
    type: {}
  });
});

test('should handle UPDATE_ROLE when role doesn\'t exist', () => {
  const action = {
    type: actionTypes.UPDATE_ROLE,
    value: 'ARole'
  };

  const expectedResult = {
    role: {
      ARole: true
    },
    type: {}
  };

  expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('should handle UPDATE_ROLE when role exists', () => {
  const initialState = {
    role: {
      BRole: true
    },
    type: {}
  };

  const action = {
    type: actionTypes.UPDATE_ROLE,
    value: 'BRole'
  };

  const expectedResult = {
    role: {},
    type: {}
  };

  expect(reducer(initialState, action)).toEqual(expectedResult);
});

test('should handle UPDATE_TYPE when type doesn\'t exist', () => {
  const action = {
    type: actionTypes.UPDATE_TYPE,
    value: 'TypeOne'
  };

  const expectedResult = {
    role: {},
    type: {
      TypeOne: true
    }
  };

  expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('should handle UPDATE_TYPE when type exists', () => {
  const initialState = {
    role: {},
    type: {
      TypeOne: true
    }
  };

  const action = {
    type: actionTypes.UPDATE_TYPE,
    value: 'TypeOne'
  };

  const expectedResult = {
    role: {},
    type: {}
  };

  expect(reducer(initialState, action)).toEqual(expectedResult);
});

test('should create an action to update a type', () => {
  const event = {
    target: {
      value: 'foo'
    }
  };

  const expectedAction = {
    type: actionTypes.UPDATE_TYPE,
    value: 'foo'
  };

  expect(actions.updateType(event)).toEqual(expectedAction)
});

test('should create an action to update a role', () => {
  const event = {
    target: {
      value: 'bar'
    }
  };

  const expectedAction = {
    type: actionTypes.UPDATE_ROLE,
    value: 'bar'
  };

  expect(actions.updateRole(event)).toEqual(expectedAction)
});