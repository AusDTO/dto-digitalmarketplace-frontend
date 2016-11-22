import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, { convertedSeller, convertApplicationToSeller, CONVERTED_SELLER } from '../applications';

test('convertseller action', () => {
  const expectedAction = {
    type: CONVERTED_SELLER,
    id: 1
  };
  expect(convertedSeller(1)).toEqual(expectedAction);
});

test('default reducer', () => {
  expect(reducer()).toEqual({});
  expect(reducer({})).toEqual({});
  expect(reducer({ foo: 'bar' })).toEqual({ foo: 'bar' });
});
