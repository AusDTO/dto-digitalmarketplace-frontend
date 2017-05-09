// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router as MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createMemoryHistory from 'history/createMemoryHistory';
import createStore from './redux/create'
import BuyerDashboardWidget from './BuyerDashboardWidget';
import sampleState from './components/Dashboard/BuyerDashboard.json';


test('BuyerDashboardWidget renders without errors', () => {
  let store = createStore(Object.assign({}, sampleState, { _serverContext: {}, options: { serverRender: false } }))
  const history = createMemoryHistory();
  const div = document.createElement('div');

  ReactDOM.render(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <BuyerDashboardWidget router={history} />
      </Provider>
    </MemoryRouter>,
    div
  )
});

