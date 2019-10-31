/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import AuthenticatedMobileLinks from './Mobile/AuthenticatedMobileLinks'
import HeaderActions from './HeaderActions'
import UnauthenticatedMobileLinks from './Mobile/UnauthenticatedMobileLinks'
import logoGovCrest from './Government_crest.js'

export class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accordionOpen: false
    }
  }

  openAccordion = () => {
    this.setState({ accordionOpen: true })
  }

  closeAccordion = () => {
    this.setState({ accordionOpen: false })
  }

  render() {
    const { location, loggedIn, notificationCount, userType } = this.props

    return (
      <section className="au-marketplace-header">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-8 col-sm-8 col-xs-12 au-marketplace-header-logo-section">
              <a href="/" title="Go to the Marketplace homepage">
                <span
                  className="au-marketplace-header-goverment-logo"
                  dangerouslySetInnerHTML={{ __html: logoGovCrest }}
                />
                <span className="au-marketplace-header-title">
                  <span className="au-marketplace-header-logo">
                    <span>Digital Marketplace</span>
                  </span>
                </span>
              </a>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12 hide-mobile no-padding-tablet">
              <div className="au-marketplace-header-user-nav">
                <HeaderActions loggedIn={loggedIn} notificationCount={notificationCount} userType={userType} />
              </div>
            </div>
          </div>
          <div className="row hide-mobile">
            <div className="col-md-12">
              <nav className="au-marketplace-header-navigation">
                <ul className="au-link-list au-link-list--inline">
                  <li className="au-marketplace-header-link-list">
                    <a
                      className={location.pathname === '/2/opportunities' ? 'au-marketplace-header-active' : ''}
                      href="/2/opportunities"
                    >
                      Opportunities
                    </a>
                  </li>
                  <li className="au-marketplace-header-link-list">
                    <a href="/search/sellers">Seller Catalogue</a>
                  </li>
                  <li className="au-marketplace-header-link-list">
                    <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000141616">Insights</a>
                  </li>
                  <li className="au-marketplace-header-link-list">
                    <a href="https://marketplace1.zendesk.com/hc/en-gb">Support</a>
                  </li>
                  <li className="au-marketplace-header-link-list">
                    <a href="/contact-us">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="row hide-desktop">
            <div className="col-md-12">
              <div className="au-marketplace-header-mobile-menu">
                <AUaccordion
                  header={this.state.accordionOpen ? 'Close menu' : 'Open menu'}
                  closed={!this.state.accordionOpen}
                  onOpen={() => {
                    this.openAccordion()
                  }}
                  onClose={() => {
                    this.closeAccordion()
                  }}
                >
                  <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
                    {loggedIn ? (
                      <AuthenticatedMobileLinks notificationCount={notificationCount} userType={userType} />
                    ) : (
                      <UnauthenticatedMobileLinks />
                    )}
                  </div>
                </AUaccordion>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  notificationCount: PropTypes.number,
  userType: PropTypes.string.isRequired
}

const mapStateToProps = ({ app }) => ({
  loggedIn: app.loggedIn,
  notificationCount: app.notificationCount,
  userType: app.userType
})

export default withRouter(connect(mapStateToProps)(Header))
