// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');
//jest.mock('react-router');

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';

import SignupForm, { Textfield } from './SignupForm';
import createStore from '../../redux/create';

test('SignupForm renders', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const component = renderer.create(
    <BrowserRouter>
      <Provider store={store}>
        <SignupForm />
      </Provider>
    </BrowserRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SignupForm renders with form_options', () => {
  const form_options = {
    csrf_token: 'sometoken',
    action: '/foo/bar'
  }
  let store = createStore(Object.assign({}, { _serverContext: {}, form_options }))
  const component = renderer.create(
    <BrowserRouter>
      <Provider store={store}>
        <SignupForm />
      </Provider>
    </BrowserRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
