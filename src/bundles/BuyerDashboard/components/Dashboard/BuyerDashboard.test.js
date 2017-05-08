// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router as MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import renderer from 'react-test-renderer';
import createStore from '../../redux/create';

import sampleState from './BuyerDashboard.json'
import BuyerDashboard from './BuyerDashboard';

test('BuyerDashboard renders without errors', () => {
  const store = createStore(Object.assign({}, { _serverContext: {} },  sampleState));
  const history = createMemoryHistory();
  const component = renderer.create(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <BuyerDashboard />
      </Provider>
    </MemoryRouter>
  )

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

test('BuyerDashboard renders view filters', () => {
  const store = createStore(Object.assign({}, { _serverContext: {} },  sampleState));
  const history = createMemoryHistory();
  const component = mount(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <BuyerDashboard />
      </Provider>
    </MemoryRouter>
  )

  expect(component.containsMatchingElement(<div>{sampleState.team.teamName}</div>)).toBeTruthy();
})