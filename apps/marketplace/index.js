import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Banner from 'shared/Banner/Banner'

import Header from './components/Header'
import AUFooter from './components/Footer/AUFooter'
import configureStore from './store'
import RootContainer from './routes'
import { fetchAuth } from './actions/appActions'

import './main.scss'

const store = configureStore()
store.dispatch(fetchAuth())

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div id="Application">
        <header role="banner">
          <Banner />
          <Header />
        </header>
        <main id="content" role="region" aria-live="polite">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <RootContainer />
              </div>
            </div>
          </div>
        </main>
        <AUFooter />
      </div>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
