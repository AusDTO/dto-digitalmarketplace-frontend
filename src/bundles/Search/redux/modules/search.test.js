import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import api from '../../../../shared/reduxModules/api';
import reducer, {
  actionTypes,
  actionCreators as actions,
  scrubState,
  convertTypes,
  buildQueryString
} from './search';

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
    keyword: '',
    sort_by: 'a-z',
    view: 'sellers',
    products: [],
    casestudies: [],
    error: false,
    user_role: ''
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
    keyword: '',
    sort_by: 'a-z',
    view: 'sellers',
    products: [],
    casestudies: [],
    error: false,
    user_role: ''
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
    role: {
      BRole: false
    },
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
    keyword: '',
    sort_by: 'a-z',
    view: 'sellers',
    products: [],
    casestudies: [],
    error: false,
    user_role: ''
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
    type: {
      TypeOne: false
    },
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

test('scrubState', () => {
  const state = {
    role: {
      'Agile delivery and Governance': false,
      'Content and Publishing': false,
      'Cyber security': true,
      'Digital products': false,
      'Emerging technology': false,
      'Marketing, Communications and Engagement': false,
      'Recruitment': true,
      'Software engineering and Development': false,
      'Strategy and Policy': false,
      'Strategy and policy': false,
      'Support and Operations': false,
      'User research and Design': false
    },
    type: {
      'Works regionally or interstate': false,
      '50% Indigenous owned business': false,
      'Australian disability enterprise': false,
      'Not-for-profit organisation': true
    },
    keyword: '',
    results: [],
    querying: false
  };

  const expectedState = {
    role: {
      'Cyber security': true,
      'Recruitment': true
    },
    type: {
      'Not-for-profit organisation': true
    }
  }

  expect(scrubState(state)).toEqual(expectedState);
});

test('buildQueryString', () => {
  const input = {
    search: {
      type: {
        'Start up': true
      },
      role: {
        'Content Design': true,
        'Agile Delivery': true
      },
      keyword: 'website'
    },
    pagination: {
      page: 1
    }
  };

  const output = [
    'type=Start up',
    'role=Content Design',
    'role=Agile Delivery',
    'keyword=website',
    'page=1'
  ];

  expect(buildQueryString(input)).toEqual(output);
  expect(buildQueryString()).toEqual([]);
  expect(buildQueryString({})).toEqual([]);
});
