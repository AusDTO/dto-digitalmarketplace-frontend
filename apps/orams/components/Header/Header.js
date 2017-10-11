/* eslint-disable */
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { rootPath } from 'orams/routes'
import styles from 'orams/components/Header/Header.scss'

class Header extends Component {
  render() {
    const { userType, loggedIn } = this.props

    const secondaryLink = () => {
      if (loggedIn && userType === 'buyer') {
        return <Link to={`${rootPath}/seller-catalogue`}>Service Matrix</Link>
      } else if (loggedIn && userType === 'supplier') {
        return <Link to={`${rootPath}/edit-profile`}>Edit Profile</Link>
      } else {
        return <Link to={`${rootPath}/signup`}>Sign up</Link>
      }
    }
    return (
      <div>
        <section className={styles.marketplaceHeader}>
          <div className={styles.wrapper}>
            <div className={styles.oramsLogo}>
              <a href="/orams" title="Go to the ORAMS homepage" className={styles.logo}>
                <span>ORAMS</span>
              </a>
              {location.pathname === '/orams' &&
                <div className={styles.subtitle}>Occupational Rehabilitation and Associated Medical Services</div>}
            </div>
            <div className={styles.userNav}>
              <div id="react-bundle-auth-header">
                <ul data-reactroot="" id="main-navigation" className={styles.inlineLinks}>
                  <li>
                    {secondaryLink()}
                  </li>
                  {loggedIn && userType == 'buyer'
                    ? <li>
                        <Link to={`${rootPath}/price-history`}>Price history</Link>
                      </li>
                    : ''}
                  <li>
                    <a href="mailto:orams@ato.gov.ua">Contact</a>
                  </li>
                  <li>
                    {loggedIn
                      ? <Link to={`${rootPath}/logout`}>Sign out</Link>
                      : <Link to={`${rootPath}/login`}>Sign in</Link>}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  userType: PropTypes.string
}

const mapStateToProps = state => ({
  loggedIn: state.app.loggedIn,
  userType: state.app.userType
})

export default withRouter(connect(mapStateToProps)(Header))
