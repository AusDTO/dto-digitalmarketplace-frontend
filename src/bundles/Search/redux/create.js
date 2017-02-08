import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './modules/reducer';

import api from '../../../shared/reduxModules/api';

/**
 * Simple queue to handle the cancelling of debounced
 * requests. If a user makes multiple actions
 * we should cancel all queued calls and attempt
 * to execute the last one only.
 */
class DebounceQueue {

  debounces = []

  add(debounce) {
    this.debounces.push(debounce);
  }

  cancelAll() {
    this.debounces.map(d => d.cancel());
    this.debounces = [];
  }
}

export default function createStore(data, thunkArgs) {
  const middleware = [
    thunk.withExtraArgument({
      api,
      debounceQueue: new DebounceQueue(),
      ...thunkArgs
    })
  ];

  let composeEnhancers = compose;
  if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const finalCreateStore = composeEnhancers(applyMiddleware(...middleware))(_createStore);
  const store = finalCreateStore(reducer, data);

  return store;
}
