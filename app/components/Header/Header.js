import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { memberInfoFetchData } from '../../actions/memberActions'
import styles from './Header.scss'

class Header extends Component {
  componentDidMount() {
    this.props.fetchData()
  }

  dashBoardLink = () => {
    if (this.props.memberInfo.userType == 'buyer') {
      return <a href="/buyers">Dashboard</a>
    } else if (this.props.memberInfo.userType == 'applicant') {
      return <a href="/sellers/application">Continue application</a>
    } else {
      return <a href="/sellers">Dashboard</a>
    }
  }

  render() {
    return (
      <section className={styles.marketplaceHeader}>
        <div className={styles.wrapper}>
          <div className={styles.marketplaceLogo}>
            <a href="/" title="Go to the Marketplace homepage" className={styles.logo}>
              <span>Digital Marketplace</span>
              <span className={styles.badgeBeta}>BETA</span>
            </a>
          </div>
          <div className={styles.userNav}>
            <div id="react-bundle-auth-header-state" />
            <div id="react-bundle-auth-header">
              <ul data-reactroot="" id="main-navigation" className={styles.inlineLinks}>
                <li>
                  {this.props.memberInfo.isAuthenticated
                    ? <span>
                        {this.dashBoardLink()}
                      </span>
                    : <a href="/signup">Join the Marketplace</a>}
                </li>
                <li>
                  {this.props.memberInfo.isAuthenticated
                    ? <a href="/logout">Sign out</a>
                    : <a href="/login">Sign in</a>}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Header.propTypes = {
  fetchData: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    memberInfo: state.memberInfo,
    hasErrored: state.memberInfoHasErrored,
    isLoading: state.memberInfoIsLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(memberInfoFetchData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
