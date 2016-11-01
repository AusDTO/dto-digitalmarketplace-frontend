// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');
//jest.mock('react-router');

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';

import CaseStudyForm, { Textfield } from './CaseStudyForm';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import sampleState from './CaseStudyForm.json';
import createStore from '../../redux/create';

test('CaseStudyForm renders', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const component = renderer.create(
    <BrowserRouter>
      <Provider store={store}>
        <CaseStudyForm />
      </Provider>
    </BrowserRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CaseStudyForm renders with form_options', () => {
  const form_options = {
    csrf_token: 'sometoken',
    action: '/foo/bar'
  }
  let store = createStore(Object.assign({}, { _serverContext: {}, form_options }))
  const component = renderer.create(
    <BrowserRouter>
      <Provider store={store}>
        <CaseStudyForm />
      </Provider>
    </BrowserRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CaseStudyForm renders with populated fields', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }, sampleState))
  const component = renderer.create(
    <BrowserRouter>
      <Provider store={store}>
        <CaseStudyForm />
      </Provider>
    </BrowserRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

