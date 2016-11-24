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

test('convertedSeller reducer', () => {
  const expectedActions = [
    { type: CONVERTED_SELLER, id: 99 }
  ]

  const state = [
      {
        id: 99,
        name: 'An app',
        email: 'b@example.com',
        status: 'submitted'
      },
      {
        id: 100,
        name: 'An app',
        email: 'a@example.com',
        status: 'submitted'
      }
    ];

  const expected = [
      {
        id: 99,
        name: 'An app',
        email: 'b@example.com',
        status: 'approved'
      },
      {
        id: 100,
        name: 'An app',
        email: 'a@example.com',
        status: 'submitted'
      }
    ];

  expect(reducer(state, convertedSeller(99))).toEqual(expected);
});

test('default reducer', () => {
  expect(reducer()).toEqual({});
  expect(reducer({})).toEqual({});
  expect(reducer({ foo: 'bar' })).toEqual({ foo: 'bar' });
});
