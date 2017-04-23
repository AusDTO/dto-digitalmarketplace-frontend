// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import ProjectView from './ProjectView';
import renderer from 'react-test-renderer';

import sampleState from './ProjectView.json';
import createStore from '../../redux/create';

test('ProjectView with required attributes', () => {
  const store = createStore(Object.assign({}, { _serverContext: {} },  sampleState));
  const component = renderer.create(
    <ProjectView store={store} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

test('ProjectView with required attributes and meta links', () => {
  let state = Object.assign({}, sampleState);
  state.project.meta = {
    editLink: 'link/to/edit',
    deleteLink: 'link/to/delete'
  };

  const store = createStore(Object.assign({}, { _serverContext: {} },  state));
  const component = renderer.create(
    <ProjectView store={store} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
