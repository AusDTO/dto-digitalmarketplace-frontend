/* eslint-disable*/
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Header from './components/Header/Header'
import AUFooter from './components/Footer/AUFooter'
import SkipToLinks from './components/SkipToLinks/SkipToLinks'
import configureStore from './store'
import RootContainer from './routes'
import { fetchAuth } from './actions/appActions'

import styles from './main.scss'

const store = configureStore()
store.dispatch(fetchAuth())

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div id="Application">
        <SkipToLinks />
        <header role="banner" className={styles['no-print']}>
          <Header />
        </header>
        <main id="content" role="region" aria-live="polite">
          <div className={`container ${styles['no-print-container']}`}>
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
