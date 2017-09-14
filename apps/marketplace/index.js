import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import debounce from 'lodash/debounce'
import Banner from '../shared/Banner/Banner'
import Header from './components/Header/Header'
import Footer from '../shared/Footer/PageFooter'
import configureStore from './store'
import RootContainer from './routes'
import { fetchAuth } from './actions/appActions'

import './main.scss'

const store = configureStore()
store.dispatch(fetchAuth())

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
