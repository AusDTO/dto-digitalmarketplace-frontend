import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './modules/reducer';

export default function createStore(data) {
  const middleware = [ thunk ]

  delete data._serverContext

  let composeEnhancers = compose;
  if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const finalCreateStore = composeEnhancers(applyMiddleware(...middleware))(_createStore);
  const store = finalCreateStore(reducer, data);

  return store;
}
