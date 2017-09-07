import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Banner from '../shared/Banner/Banner'
import Header from './components/Header/Header'
import Footer from '../shared/Footer/PageFooter'
import configureStore from './store'

import RootContainer from './routes'

import './main.scss'

const store = configureStore()

const App = () =>
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

ReactDOM.render(<App />, document.getElementById('root'))
