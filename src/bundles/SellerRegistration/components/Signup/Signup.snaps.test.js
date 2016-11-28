// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { actions } from 'react-redux-form';
import renderer from 'react-test-renderer';

import Signup from './Signup';
import sampleState from '../../ApplicantSignup.json';
import createStore from '../../redux/create-signup';

test('Signup renders', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const component = renderer.create(
    <MemoryRouter initialEntries={['/start']} initialIndex={0}>
      {({ action, location, router }) => (
        <Provider store={store}>
          <Signup router={router} location={location} />
        </Provider>
      )}
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Signup renders empty Your Info form', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const component = renderer.create(
    <MemoryRouter initialEntries={['/your-info']} initialIndex={0}>
      {({ action, location, router }) => (
        <Provider store={store}>
          <Signup router={router} location={location} />
        </Provider>
      )}
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Signup renders populated Your Info form', () => {
  delete sampleState.basename;
  let store = createStore(Object.assign({}, { _serverContext: {} }, sampleState))
  const component = renderer.create(
    <MemoryRouter initialEntries={['/your-info']} initialIndex={0}>
      {({ action, location, router }) => (
        <Provider store={store}>
          <Signup router={router} location={location} />
        </Provider>
      )}
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});