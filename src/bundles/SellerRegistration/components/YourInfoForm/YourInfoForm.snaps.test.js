// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import YourInfoForm, { Textfield } from './YourInfoForm';
import createStore from '../../redux/create';

test('YourInfoForm renders', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const component = renderer.create(
    <BrowserRouter>
      <Provider store={store}>
        <YourInfoForm />
      </Provider>
    </BrowserRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('YourInfoForm renders with form_options', () => {
  const form_options = {
    csrf_token: 'sometoken',
    action: '/foo/bar'
  }
  let store = createStore(Object.assign({}, { _serverContext: {}, form_options }))
  const component = renderer.create(
    <BrowserRouter>
      <Provider store={store}>
        <YourInfoForm />
      </Provider>
    </BrowserRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('YourInfoForm renders with edit mode', () => {
  const form_options = {
    csrf_token: 'sometoken',
    action: '/foo/bar',
    mode: 'edit'
  }
  let store = createStore(Object.assign({}, { _serverContext: {}, form_options }))
  const component = renderer.create(
    <BrowserRouter>
      <Provider store={store}>
        <YourInfoForm />
      </Provider>
    </BrowserRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
