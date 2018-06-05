/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import DashBoardLink from './DashBoardLink'
import logoGovCrest from './Government_crest.svg'
import styles from './Header.scss'

const Header = props => {
  const { userType, loggedIn } = props

  return (
    <section className={styles.marketplaceHeader}>
      <div className="container">
        <div className="row">
          <div className={`col-md-8 col-xs-12 ${styles.logoSectionDesktop}`}>
            <a href="/" title="Go to the Marketplace homepage">
              <span className={styles.logoGovCrest} dangerouslySetInnerHTML={{ __html: logoGovCrest }} />
              <span className={styles.marketplaceTitle}>
                <span className={styles.logo}>
                  <span>Digital Marketplace</span>
                  <span className={styles.badgeBeta}>beta</span>
                </span>
              </span>
            </a>
          </div>
          <div className="col-md-4 col-xs-12">
            <div className={styles.userNav}>
              <div id="react-bundle-auth-header-state" />
              <div id="react-bundle-auth-header">
                <ul data-reactroot="" id="main-navigation" className={styles.inlineLinks}>
                  <li>
                    {loggedIn ? <DashBoardLink userType={userType} /> : <Link to="/2/signup" className="au-btn au-btn--secondary au-btn--dark">Sign up</Link>}
                  </li>
                  <li>
                    {loggedIn ? <a href="/logout">Sign out</a> : <a href="/login" class="au-btn au-btn--dark">Sign in</a>}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <nav className={styles.navigation}>
              <ul className="au-link-list au-link-list--inline">
                <li className={styles.linkList}>
                  <a href="/digital-marketplace/opportunities?status=live">
                    Opportunities
                  </a>
                </li>
                <li className={styles.linkList}>
                  <a href="/search/sellers">
                    Seller Catalogue
                  </a>
                </li>
                <li className={styles.linkList}>
                  <a href="../templates">
                    How it works
                  </a>
                </li>
                <li className={styles.linkList}>
                  <a href="/insights">
                    Insights
                  </a>
                </li>
                <li className={styles.linkList}>
                  <a href="https://marketplace1.zendesk.com/hc/en-gb">
                    Support
                  </a>
                </li>
              </ul>
            </nav>
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
