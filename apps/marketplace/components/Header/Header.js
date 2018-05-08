/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import DashBoardLink from './DashBoardLink'
import logoGovCrest from './Government_crest.svg'

const Header = props => {
  const { userType, loggedIn } = props

  return (
    <section className="au-marketplace-header">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-xs-12 au-marketplace-header-logo-section">
            <a href="/" title="Go to the Marketplace homepage">
              <span className="au-marketplace-header-goverment-logo" dangerouslySetInnerHTML={{ __html: logoGovCrest }} />
              <span className="au-marketplace-header-title">
                <span className="au-marketplace-header-logo">
                  <span>Digital Marketplace</span>
                  <span className="au-marketplace-header-badge">beta</span>
                </span>
              </span>
            </a>
          </div>
          <div className="col-md-4 col-xs-12">
            <div className="au-marketplace-header-user-nav">
              <div id="react-bundle-auth-header-state" />
              <div id="react-bundle-auth-header">
                <ul data-reactroot="" id="main-navigation" className="au-marketplace-header-inline-links">
                  <li>
                    {loggedIn ? <DashBoardLink userType={userType} /> : <a href="/2/signup" className="au-btn au-btn--secondary au-btn--dark">Sign up</a>}
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
            <nav className="au-marketplace-header-navigation">
              <ul className="au-link-list au-link-list--inline">
                <li className="au-marketplace-header-link-list">
                  <a href="/digital-marketplace/opportunities?status=live">
                    Opportunities
                  </a>
                </li>
                <li className="au-marketplace-header-link-list">
                  <a href="/search/sellers">
                    Seller Catalogue
                  </a>
                </li>
                <li className="au-marketplace-header-link-list">
                  <a href="../templates">
                    How it works
                  </a>
                </li>
                <li className="au-marketplace-header-link-list">
                  <a href="/insights">
                    Insights
                  </a>
                </li>
                <li className="au-marketplace-header-link-list">
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
