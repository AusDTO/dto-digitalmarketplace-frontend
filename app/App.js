import React from 'react'
import ReactDOM from 'react-dom'
import Banner from './components/Banner/Banner'
import Header from './components/Header/Header'
import Footer from './components/Footer/PageFooter'
import { Provider } from 'react-redux'
import configureStore from './store'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import RootContainer from './routes'

import './App.scss'

const store = configureStore()

const App = props => (
  <Provider store={store}>
    <BrowserRouter>
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
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('appReact'))


