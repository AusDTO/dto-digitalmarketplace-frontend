// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store';

import DomainSelector from './DomainSelector'
import createStore from '../../../ApplicantSignup/redux/create'

test('DomainSelector renders', () => {
  const store = createStore({
    form_options: {
      csrf_token: 'abc'
    }
  });

  const component = renderer.create(
    <Provider store={store}>
      <DomainSelector />
    </Provider>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('DomainSelector renders with populated fields', () => {
  const store = createStore({
    form_options: {
      csrf_token: 'abc'
    },
    domainSelectorForm: {
      services: {
        'User research': true,
        'Development': true,
        'Content management': false
      }
    }
  });

  const component = renderer.create(
    <Provider store={store}>
      <DomainSelector />
    </Provider>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

