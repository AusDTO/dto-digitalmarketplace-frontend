import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { actionTypes } from 'react-redux-form';

import api from '../../../../../shared/reduxModules/api';

import reducer, {
  actions,
  constants as types
} from '../application';

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};


test('preSubmit action', () => {
  const expectedAction = {
    type: types.APP_PRE_SUBMIT
  };
  expect(actions.preSubmit()).toEqual(expectedAction);
});

test('postSubmit action', () => {
  const expectedAction = {
    type: types.APP_POST_SUBMIT
  };
  expect(actions.postSubmit()).toEqual(expectedAction);
});

test('submit action with no payload', () => {
  const expectedAction = {
    type: types.APP_SUBMIT,
    payload: {}
  };
  expect(actions.submit()).toEqual(expectedAction);
});

test('submit action with payload', () => {
  const expectedAction = {
    type: types.APP_SUBMIT,
    payload: { foo: 'bar' }
  };
  expect(actions.submit({ foo: 'bar' })).toEqual(expectedAction);
});

test('preStep action', () => {
  const expectedAction = {
    type: types.STEP_PRE
  };
  expect(actions.preStep()).toEqual(expectedAction);
});

test('nextStep action', () => {
  const expectedAction = {
    type: types.STEP_NEXT
  };
  expect(actions.nextStep()).toEqual(expectedAction);
});

test('stepNextPersist action', () => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve(mockResponse(200, null, '{"application":{}}')));

  const pushMock = jest.fn();
  const router = {
    push: pushMock
  };

  const middlewares = [ thunk.withExtraArgument({ api, router }) ];
  const mockStore = configureMockStore(middlewares);

  const to = '/bar/baz';
  const step = {
    formKey: 'fooBar'
  }

  const expectedActions = [
    { type: types.APP_PRE_SUBMIT },
    { type: types.APP_SUBMIT, payload: { application: {} } },
    { type: types.APP_POST_SUBMIT },
    { type: types.STEP_PRE },
    { type: types.STEP_NEXT, to }
  ]

  const store = mockStore({});
  return store.dispatch(actions.stepNextPersist(to, step))
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith(to);
    });
});

test('submitApplication action', () => {
  
  const expectedPayload = {
    application: {
      foo: 'bar',
      baz: 'foo',
      bar: 'baz',
      foobar: 'barfoo'
    }
  };

  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve(mockResponse(200, null, JSON.stringify(expectedPayload))));

  const middlewares = [ thunk.withExtraArgument({ api }) ];
  const mockStore = configureMockStore(middlewares);


  const expectedActions = [
    { type: types.APP_PRE_SUBMIT },
    { type: types.APP_SUBMIT, payload: expectedPayload },
    { type: actionTypes.CHANGE, model: 'firstForm', multi: false, silent: false, value: { foo: 'bar', baz: 'foo'}},
    { type: actionTypes.CHANGE, model: 'secondForm', multi: false, silent: false, value: { bar: 'baz', foobar: 'barfoo'}},
    { type: types.APP_POST_SUBMIT },
  ]

  const store = mockStore({
    firstForm: {
      foo: 'bar',
      baz: 'foo'
    },
    secondForm: {
      bar: 'baz',
      foobar: 'barfoo'
    },
    // This should be pruned
    options: {
      serverRender: false
    },
    form_options: {
      csrf_token: 'randomtoken'
    }
  });

  return store.dispatch(actions.submitApplication())
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    });
});

test('default reducer', () => {
  expect(reducer()).toEqual({});
  expect(reducer({})).toEqual({});
  expect(reducer({ foo: 'bar' })).toEqual({ foo: 'bar' });
});