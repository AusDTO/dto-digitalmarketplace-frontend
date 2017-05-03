// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import { Provider } from 'react-redux';
import { Router as MemoryRouter } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory'
import renderer from 'react-test-renderer';

import ProjectForm from './ProjectForm';
import sampleState from './ProjectForm.json';
import createStore from '../../redux/create';

test('ProjectForm renders', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const history = createMemoryHistory();
  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <ProjectForm router={history} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ProjectForm renders with form_options', () => {
  const form_options = {
    csrf_token: 'sometoken',
    action: '/foo/bar'
  }

  const history = createMemoryHistory();

  let store = createStore(Object.assign({}, { _serverContext: {}, form_options }))
  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <ProjectForm router={history} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ProjectForm renders with errors', () => {
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
        <ProjectForm router={history} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ProjectForm renders with populated fields', () => {
  const history = createMemoryHistory();
  let store = createStore(Object.assign({}, { _serverContext: {} }, sampleState))
  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <ProjectForm router={history} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ProjectForm renders empty in edit mode', () => {
  let store = createStore(Object.assign({}, { 
    _serverContext: {}, 
    form_options: { 
      mode: 'edit' 
    },
    project: {
      returnLink: <a href="http://www.right.back/to/where/you/came/from">Return without saving</a>
    } 
  }))

  const history = createMemoryHistory();

  const component = renderer.create(
    <MemoryRouter history={history}>      
      <Provider store={store}>
        <ProjectForm router={history} mounted={true} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test.skip('ProjectForm renders an empty reference page', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const history = createMemoryHistory({
    initialEntries: ['/reference'],
    initialIndex: 0
  });
  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <ProjectForm router={history} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test.skip('ProjectForm renders an empty reference page in edit mode', () => {
  const history = createMemoryHistory({
    initialEntries: ['/reference'],
    initialIndex: 0
  });
  let store = createStore(Object.assign({}, { _serverContext: {}, form_options: { mode: 'edit' } }))
  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <ProjectForm router={history} mounted={true} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test.skip('ProjectForm renders a populated reference page', () => {
  const state = {
    project: {
      returnLink: 'http://www.right.back/to/where/you/came/from'
    },
    projectForm: {
      opportunity: 'The opportunity',
      client: 'The Client Name',
      timeframe: 'January 2016 — June 2016',
      problem: 'The problem',
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
        <ProjectForm router={router} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

