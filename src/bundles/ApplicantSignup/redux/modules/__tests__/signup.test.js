import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { actionTypes } from 'react-redux-form';

import reducer, {
  actions,
  constants as types
} from '../signup';


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

test('stepNext action', () => {
  const middlewares = [ thunk ];
  const mockStore = configureMockStore(middlewares);
  const transition = jest.fn();
  const to = '/foo/bar';
  const expectedActions = [
    { type: types.STEP_NEXT, to }
  ]
  
  const store = mockStore({});
  store.dispatch(actions.stepNext(transition, to))

  expect(store.getActions()).toEqual(expectedActions);
  expect(transition).toHaveBeenCalledTimes(1);
  expect(transition).toHaveBeenCalledWith(to);
});

test('stepNextPersist action', () => {
  // TODO when we figure out what we're posting/receiving
  // this will need to change
  const apiMock = () => { return Promise.resolve() }

  const middlewares = [ thunk.withExtraArgument(apiMock) ];
  const mockStore = configureMockStore(middlewares);

  const transition = jest.fn();
  const to = '/bar/baz';
  const step = {
    formKey: 'fooBar'
  }

  const expectedActions = [
    { type: types.APP_PRE_SUBMIT },
    { type: types.APP_SUBMIT, payload: { application: {} } },
    { type: types.APP_POST_SUBMIT },
    { type: types.STEP_PRE },
    { type: actionTypes.SET_SUBMITTED, model: 'fooBar', submitted: true },
    { type: actionTypes.SET_PRISTINE, model: 'fooBar' },
    { type: types.STEP_NEXT, to }
  ]

  const store = mockStore({});
  return store.dispatch(actions.stepNextPersist(transition, to, step))
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
      expect(transition).toHaveBeenCalledTimes(1);
      expect(transition).toHaveBeenCalledWith(to);
    });
});

test('submitApplcation action', () => {
  // TODO when we figure out what we're posting/receiving
  // this will need to change
  const apiMock = () => { return Promise.resolve() }

  const middlewares = [ thunk.withExtraArgument(apiMock) ];
  const mockStore = configureMockStore(middlewares);

  const expectedPayload = {
    application: {
      foo: 'bar',
      baz: 'foo',
      bar: 'baz',
      foobar: 'barfoo'
    }
  };

  const expectedActions = [
    { type: types.APP_PRE_SUBMIT },
    { type: types.APP_SUBMIT, payload: expectedPayload },
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