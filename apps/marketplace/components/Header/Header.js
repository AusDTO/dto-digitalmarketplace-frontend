import React from 'react'
import PropTypes from 'prop-types'

import DashBoardLink from './DashBoardLink'

import styles from './Header.scss'

const Header = props => {
  const { userType, isLoggedIn } = props

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
                {isLoggedIn ? <DashBoardLink userType={userType} /> : <a href="/2/signup">Join the Marketplace</a>}
              </li>
              <li>
                {isLoggedIn ? <a href="/logout">Sign out</a> : <a href="/login">Sign in</a>}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

Header.propTypes = {
  userType: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

export default Header
