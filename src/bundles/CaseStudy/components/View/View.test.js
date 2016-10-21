// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import View from './View';
import renderer from 'react-test-renderer';

import sampleState from './View.json';
import createStore from '../../redux/create';

test('VerticalList with required attributes', () => {
  const store = createStore(Object.assign({}, { _serverContext: {} },  sampleState));
  const component = renderer.create(
    <View store={store} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

test('VerticalList with required attributes and meta links', () => {
  let state = Object.assign({}, sampleState);
  state.casestudy.meta = {
    editLink: 'link/to/edit',
    deleteLink: 'link/to/delete'
  };

  const store = createStore(Object.assign({}, { _serverContext: {} },  state));
  const component = renderer.create(
    <View store={store} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
