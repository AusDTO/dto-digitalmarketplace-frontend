// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');
jest.mock('../../../../shared/Icon/_getIcons');

import React from 'react';
import { Provider } from 'react-redux';
import { Router as MemoryRouter } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory'
import { actions } from 'react-redux-form';
import renderer from 'react-test-renderer';

import Signup from './Signup';
import sampleState from '../../ApplicantSignup.json';
import createStore from '../../redux/create-signup';

const filterSteps = (step) => {
  // Remove steps with patterns of /start and /case-study and /review and /submit
  return !step.pattern.match(/\/profile-finish/);
};

test('Signup renders', () => {
  let store = createStore();

  const history = createMemoryHistory({
    initialEntries: ['/start'],
    initialIndex: 0
  });

  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <Signup router={history} location={history.location} filterSteps={filterSteps} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Signup renders empty Your Info form', () => {
  let store = createStore({
    form_options: {
      action: void 0
    },
    application: {
      type: 'new'
    }
  });

  const history = createMemoryHistory({
    initialEntries: ['/your-info'],
    initialIndex: 0
  });

  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <Signup router={history} location={history.location} filterSteps={filterSteps} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Signup renders populated Your Info form', () => {
  delete sampleState.basename;
  let store = createStore(sampleState);

  const history = createMemoryHistory({
    initialEntries: ['/your-info'],
    initialIndex: 0
  });

  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <Signup router={history} location={history.location} filterSteps={filterSteps} />
      </Provider>
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
