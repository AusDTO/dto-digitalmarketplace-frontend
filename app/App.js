import React from 'react'
import { render } from 'react-dom'
import Banner from './components/Banner/Banner'
import Header from './components/Header/Header'
import Footer from './components/Footer/PageFooter'
import { Provider } from 'react-redux'
import configureStore from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import RootContainer from './routes'
import './App.scss'

const store = configureStore()
const history = createHistory()

render(
  <Provider store={store}>
    <Router history={history}>
      <div id="Application">
        <header role="banner">
          <Banner />
          <Header />
        </header>
        <main id="content">
          <RootContainer />
        </main>
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById('appReact')
)
