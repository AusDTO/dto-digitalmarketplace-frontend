import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { actionTypes } from 'react-redux-form';

import api from '../../../../../shared/reduxModules/api';

import reducer, {
  actions,
  constants as types
} from '../steps';


test('stepInitial action', () => {
  const expectedAction = {
    type: types.STEP_INITIAL,
    data: { foo: 'bar' }
  };
  expect(actions.setSteps({ foo: 'bar' })).toEqual(expectedAction)
});

test('stepComplete action', () => {
  const expectedAction = {
    type: types.STEP_COMPLETE
  };
  expect(actions.stepComplete()).toEqual(expectedAction)
});

test('stepPartial action', () => {
  const expectedAction = {
    type: types.STEP_PARTIAL
  };
  expect(actions.stepPartial()).toEqual(expectedAction)
});

test('stepClear action', () => {
  const expectedAction = {
    type: types.STEP_CLEAR
  };
  expect(actions.stepClear()).toEqual(expectedAction)
});


test('steps reducer should handle STEP_CLEAR', () => {
    const previousState = {
      products: 'complete',
      digital: 'complete'
    };

    const action = {
      type: types.STEP_CLEAR,
      step: 'digital'
    }

    const expectedNewState = {
      products: 'complete'
    };

    expect(
      reducer(previousState, action)
    ).toEqual(expectedNewState);

});

