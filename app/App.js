import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import debounce from 'lodash/debounce'
import Banner from './components/Banner/Banner'
import Header from './components/Header/Header'
import Footer from './components/Footer/PageFooter'
import configureStore from './store'
import screenResize from './actions/mediaActions'

import RootContainer from './routes'

import './App.scss'

const store = configureStore()

window.addEventListener(
  'resize',
  debounce(() => {
    store.dispatch(screenResize(window.innerWidth))
  }, 300)
)

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

ReactDOM.render(<App />, document.getElementById('appReact'))
