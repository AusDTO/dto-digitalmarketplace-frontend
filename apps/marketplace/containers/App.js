import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Banner from '../components/Banner/Banner'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/PageFooter'
import RootContainer from '../routes'
import { checkAuth } from '../actions/appActions'

import './App.scss'

export class AppComponent extends Component {
  static propTypes = {
    userType: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    checkAuth: PropTypes.func.isRequired
  }

  static defaultProps = {
    userType: '',
    isLoggedIn: false,
    checkAuth: () => {}
  }

  componentDidMount() {
    this.props.checkAuth()
  }

  render() {
    const { userType, isLoggedIn } = this.props

    return (
      <div id="Application">
        <header role="banner">
          <Banner />
          <Header userType={userType} isLoggedIn={isLoggedIn} />
        </header>
        <main id="content">
          <RootContainer />
        </main>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({ app }) => ({
  isLoggedIn: app.isLoggedIn,
  userType: app.userType
})

const mapDispatchToProps = dispatch => ({
  checkAuth: () => dispatch(checkAuth())
})

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent)

export default App
