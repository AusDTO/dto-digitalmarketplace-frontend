import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

export default function configureStore(initialState) {
  const debugware = []
  debugware.push(createLogger({ collapsed: true }))

  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, ...debugware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)
  return createStoreWithMiddleware(rootReducer, initialState, applyMiddleware(thunk, reduxImmutableStateInvariant()))
}
