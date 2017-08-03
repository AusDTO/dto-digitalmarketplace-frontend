import React from 'react'
import { render } from 'react-dom'
import Banner from './components/Banner/Banner'
import Header from './components/Header/Header'
import Footer from './components/Footer/PageFooter'
import {Provider} from 'react-redux'
import configureStore from './store'
import SignupForm from './components/SignupForm/SignupForm'
import './App.scss'

const store = configureStore()

render (
  <Provider store={store}>
    <div id="Application">
      <header role="banner">
        <Banner />
        <Header />
      </header>
      <main id="content">
        <SignupForm />
      </main>
      <Footer />
    </div>
  </Provider>,
  document.getElementById('appReact')
)
