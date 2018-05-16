// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store';

import { Router } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory'

import PricingForm from './PricingForm'
import createStore from '../../redux/create-signup'

test('PricingForm renders a notice that domains are required', () => {
  const store = createStore({
    form_options: {
      csrf_token: 'abc'
    },
    options: {
      serverRender: false
    }
  });

  const history = createMemoryHistory();
  const component = renderer.create(
    <Router history={history}>
      <Provider store={store}>
        <PricingForm services={{}} />
      </Provider>
    </Router>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('PricingForm renders price fields when domains are present', () => {
  const domains = {
    'User research': 123,
    'Content development': 456,
    'Content management': 789
  }

  const services = {
    'User research': true,
    'Content development': true,
    'Content management': true
  }
  const store = createStore({
    form_options: {
      csrf_token: 'abc'
    },
    options: {
      serverRender: false
    }
  });

  const component = renderer.create(
    <Provider store={store}>
      <PricingForm domains={domains} services={services} />
    </Provider>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

