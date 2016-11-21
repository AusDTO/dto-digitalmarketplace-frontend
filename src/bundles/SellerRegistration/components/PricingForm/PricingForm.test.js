// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store';

import PricingForm from './PricingForm'
import createStore from '../../../ApplicantSignup/redux/create'

test('PricingForm renders a notice that domains are required', () => {
  const store = createStore({
    form_options: {
      csrf_token: 'abc'
    }
  });

  const component = renderer.create(
    <Provider store={store}>
      <PricingForm />
    </Provider>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('PricingForm renders price fields when domains are present', () => {
  const store = createStore({
    form_options: {
      csrf_token: 'abc'
    },
    domainSelectorForm: {
      services: {  
        'User research': true,
        'Content development (copywriting, translation, illustration, photography, video and animation)': true,
        'Content management': true
      }
    }
  });

  const component = renderer.create(
    <Provider store={store}>
      <PricingForm />
    </Provider>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

