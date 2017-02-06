// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import { Provider } from 'react-redux';
import { Router as MemoryRouter } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory'
import renderer from 'react-test-renderer';

import CaseStudyForm from './CaseStudyForm';
import sampleState from './CaseStudyForm.json';
import createStore from '../../redux/create';

test('CaseStudyForm renders', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const history = createMemoryHistory();
  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <CaseStudyForm router={history} />
      </Provider>
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

  const history = createMemoryHistory();

  let store = createStore(Object.assign({}, { _serverContext: {}, form_options }))
  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <CaseStudyForm router={history} />
      </Provider>
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

  const history = createMemoryHistory();

  let store = createStore(Object.assign({}, { _serverContext: {}, form_options }))
  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <CaseStudyForm router={history} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CaseStudyForm renders with populated fields', () => {
  const history = createMemoryHistory();
  let store = createStore(Object.assign({}, { _serverContext: {} }, sampleState))
  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <CaseStudyForm router={history} />
      </Provider>
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

  const history = createMemoryHistory();

  const component = renderer.create(
    <MemoryRouter history={history}>      
      <Provider store={store}>
        <CaseStudyForm router={history} mounted={true} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test.skip('CaseStudyForm renders an empty reference page', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const history = createMemoryHistory({
    initialEntries: ['/reference'],
    initialIndex: 0
  });
  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <CaseStudyForm router={history} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test.skip('CaseStudyForm renders an empty reference page in edit mode', () => {
  const history = createMemoryHistory({
    initialEntries: ['/reference'],
    initialIndex: 0
  });
  let store = createStore(Object.assign({}, { _serverContext: {}, form_options: { mode: 'edit' } }))
  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <CaseStudyForm router={history} mounted={true} />
      </Provider>
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

  const history = createMemoryHistory({
    initialEntries: ['/reference'],
    initialIndex: 0
  });

  let store = createStore(Object.assign({}, { _serverContext: {} }, state))
  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <CaseStudyForm router={router} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

