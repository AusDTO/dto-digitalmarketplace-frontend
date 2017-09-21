import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Banner from 'shared/Banner/Banner'
import Footer from 'shared/Footer/PageFooter'

import Header from './components/Header/Header'
import configureStore from './store'
import RootContainer from './routes'
import { fetchAuth } from './actions/appActions'

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
        <div id="content">
          <RootContainer />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>

ReactDOM.render(<App />, document.getElementById('root'))
