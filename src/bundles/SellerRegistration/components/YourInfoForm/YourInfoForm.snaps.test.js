// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');
//jest.mock('react-router');

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
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
