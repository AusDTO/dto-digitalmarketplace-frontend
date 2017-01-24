import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import api from '../../../../shared/reduxModules/api';
import reducer, { actionTypes, actionCreators as actions } from './search';

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

test('reducer should return initial state', () => {
  expect(reducer()).toEqual({
    role: {},
    type: {},
    querying: false,
    results: [],
    keyword: ''
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
    type: {},
    querying: false,
    results: [],
    keyword: ''
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
    type: {},
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
    },
    querying: false,
    results: [],
    keyword: ''
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
    type: {},
  };

  expect(reducer(initialState, action)).toEqual(expectedResult);
});

// TODO skipping this test
// @see https://github.com/facebook/jest/issues/2684
test.skip('updateRole action', () => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve(mockResponse(200, null, '[{"foo":"bar"}]')));

  const middlewares = [ thunk.withExtraArgument(api) ];
  const mockStore = configureMockStore(middlewares);

  const expectedActions = [
    { type: actionTypes.PRE_SEARCH },
    { type: actionTypes.UPDATE_ROLE, value: 'strategy' },
    { type: actionTypes.SYNC_RESULTS, result: [{ foo: 'bar' }] },
  ];

  // Role will be empty as there is not reducer handling the actions
  const expectedFetchOptions = {
    'Content-Type': 'application/json',
    body: JSON.stringify({ role: {}, type: {}, keyword: ''}),
    credentials: 'same-origin', 
    method: 'POST'
  }
  

  const store = mockStore({
    form_options: {
      action: 'http://foo.bar'
    },
    search: {
      role: {},
      type: {},
      keyword: '',
      results: [],
      querying: false
    }
  });


  store.dispatch(actions.updateRole({ target: { value: 'strategy' }}));
 
  expect(window.fetch).toHaveBeenCalledTimes(1);
  expect(window.fetch).toHaveBeenCalledWith('http://foo.bar', expectedFetchOptions)
  expect(store.getActions()).toEqual(expectedActions);
});