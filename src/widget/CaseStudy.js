import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'

// Need to make this work.
// import { CaseStudy, createStore } from '../bundles/CaseStudy'
import createStore from '../bundles/CaseStudy/redux/create'
import CaseStudy from '../bundles/CaseStudy/CaseStudy'

let initialState = window.__INITIAL_STATE__ || {}
const store = createStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <CaseStudy />
    </BrowserRouter>
  </Provider>,
  document.getElementById('react-bundle-casestudy')
);
