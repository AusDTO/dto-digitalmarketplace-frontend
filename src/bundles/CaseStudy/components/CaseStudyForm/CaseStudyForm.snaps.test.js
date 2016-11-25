// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';

import CaseStudyForm from './CaseStudyForm';
import sampleState from './CaseStudyForm.json';
import createStore from '../../redux/create';

test('CaseStudyForm renders', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const component = renderer.create(
    <MemoryRouter>
      {({ action, location, router }) => (
        <Provider store={store}>
          <CaseStudyForm router={router} />
        </Provider>
      )}
    </MemoryRouter>
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
    <MemoryRouter>
      {({ router }) => (
        <Provider store={store}>
          <CaseStudyForm router={router} />
        </Provider>
      )}
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CaseStudyForm renders with errors', () => {
  const form_options = {
    csrf_token: 'sometoken',
    action: '/foo/bar',
    errors: {
      title: {
        required: true
      }
    }
  }

  let store = createStore(Object.assign({}, { _serverContext: {}, form_options }))
  const component = renderer.create(
    <MemoryRouter>
      {({ router }) => (
        <Provider store={store}>
          <CaseStudyForm router={router} />
        </Provider>
      )}
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CaseStudyForm renders with populated fields', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }, sampleState))
  const component = renderer.create(
    <MemoryRouter>
      {({ router }) => (
        <Provider store={store}>
          <CaseStudyForm router={router} />
        </Provider>
      )}
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CaseStudyForm renders empty in edit mode', () => {
  let store = createStore(Object.assign({}, { 
    _serverContext: {}, 
    form_options: { 
      mode: 'edit' 
    },
    casestudy: {
      returnLink: <a href="http://www.right.back/to/where/you/came/from">Return without saving</a>
    } 
  }))
  const component = renderer.create(
    <MemoryRouter>
      {({ action, location, router }) => (
        <Provider store={store}>
          <CaseStudyForm router={router} mounted={true} />
        </Provider>
      )}
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test.skip('CaseStudyForm renders an empty reference page', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const component = renderer.create(
    <MemoryRouter initialEntries={['/reference']} initialIndex={0}>
      {({ action, location, router }) => (
        <Provider store={store}>
          <CaseStudyForm router={router} />
        </Provider>
      )}
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test.skip('CaseStudyForm renders an empty reference page in edit mode', () => {
  let store = createStore(Object.assign({}, { _serverContext: {}, form_options: { mode: 'edit' } }))
  const component = renderer.create(
    <MemoryRouter initialEntries={['/reference']} initialIndex={0}>
      {({ action, location, router }) => (
        <Provider store={store}>
          <CaseStudyForm router={router} mounted={true} />
        </Provider>
      )}
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test.skip('CaseStudyForm renders a populated reference page', () => {
  const state = {
    casestudy: {
      returnLink: 'http://www.right.back/to/where/you/came/from'
    },
    caseStudyForm: {
      opportunity: 'The opportunity',
      client: 'The Client Name',
      timeframe: 'January 2016 — June 2016',
      approach: 'The approach',
      outcome: [
          'Outcome 1',
          'Outcome 2'
      ],
      name: 'Your full name'
    },
    form_options: {
      action: 'https://httpbin.org/post',
      csrf_token: 'somecsrftoken'
    }
  }

  let store = createStore(Object.assign({}, { _serverContext: {} }, state))
  const component = renderer.create(
    <MemoryRouter initialEntries={['/reference']} initialIndex={0}>
      {({ action, location, router }) => (
        <Provider store={store}>
          <CaseStudyForm router={router} />
        </Provider>
      )}
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

