import { createStore as _createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './modules/reducer'

import api from './api'

export default function createStore(data) {
  const middleware = [thunk.withExtraArgument(api.bind(null, data._serverContext))]

  delete data._serverContext

  const finalCreateStore = applyMiddleware(...middleware)(_createStore);
  const store = finalCreateStore(reducer, data);

  return store;
}
