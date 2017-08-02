import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

export default function configureStore(initialState) {
  const debugware = [];
  if (process.env.NODE_ENV !== "production") {
    debugware.push(createLogger({ collapsed: true }));
  }
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, ...debugware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  return createStoreWithMiddleware(rootReducer, initialState);
}
