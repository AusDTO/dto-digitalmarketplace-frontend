import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import DashBoardLink from './DashBoardLink'

import styles from './Header.scss'

const Header = props => {
  const { userType, loggedIn } = props

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
                {loggedIn ? <DashBoardLink userType={userType} /> : <Link to="/2/signup">Join the Marketplace</Link>}
              </li>
              <li>{loggedIn ? <a href="/logout">Sign out</a> : <a href="/login">Sign in</a>}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

Header.propTypes = {
  userType: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = ({ app }) => ({
  loggedIn: app.loggedIn,
  userType: app.userType
})

export default connect(mapStateToProps)(Header)
