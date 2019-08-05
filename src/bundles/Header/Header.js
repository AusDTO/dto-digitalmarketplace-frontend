import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'

import RegisterComponent from '../../RegisterComponent'
import { returnPath } from './helper'
import logoGovCrest from './Government_crest.svg'
import './Header.css'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accordionOpen: false
    }
  }

  openAccordion = ( ) => {
    this.setState({ accordionOpen: true });
  }

  closeAccordion = ( ) => {
    this.setState({ accordionOpen: false });
  }

  render() {
    return (
      <section className="au-marketplace-header">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-8 col-sm-8 col-xs-12 au-marketplace-header-logo-section">
              <a href="/" title="Go to the Marketplace homepage">
                <span className="au-marketplace-header-goverment-logo" dangerouslySetInnerHTML={{ __html: logoGovCrest }} />
                <span className="au-marketplace-header-title">
                  <span className="au-marketplace-header-logo">
                    <span>Digital Marketplace</span>
                  </span>
                </span>
              </a>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12 hide-mobile no-padding-tablet">
              <div className="au-marketplace-header-user-nav">
                <div id="react-bundle-auth-header-state" />
                <div id="react-bundle-auth-header">
                  <ul data-reactroot="" id="main-navigation" className="au-marketplace-header-inline-links">
                    <li>
                      {this.props.isAuthenticated ? 
                      <span>
                        <a href={this.props.dashboardUrl}>{this.props.dashboardText}</a>
                        {(this.props.notificationCount && this.props.notificationCount !== 0) ?
                          <div className="notification">{this.props.notificationCount}</div> : ''
                        }
                      </span> : <a href="/2/signup" className="au-btn au-btn--secondary au-btn--dark">Sign up</a>}
                    </li>
                    <li>
                      {this.props.isAuthenticated ? <a href={this.props.logoutUrl}>Sign out</a> : <a href="/login" className="au-btn au-btn--dark">Log in</a>}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row hide-mobile">
            <div className="col-md-12">
              <nav className="au-marketplace-header-navigation">
                <ul className="au-link-list au-link-list--inline">
                  <li className="au-marketplace-header-link-list">
                    <a
                      styleName={this.props.location.pathname === '/2/opportunities' ? 'au-marketplace-header-active' : ''}
                      href="/2/opportunities"
                    >
                      Opportunities
                    </a>
                  </li>
                  <li className="au-marketplace-header-link-list">
                    <a
                      styleName={this.props.location.pathname === '/search/sellers' ? 'au-marketplace-header-active' : ''}
                      href="/search/sellers"
                    >
                      Seller Catalogue
                    </a>
                  </li>
                  <li className="au-marketplace-header-link-list">
                    <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000141616">
                      Insights
                    </a>
                  </li>
                  <li className="au-marketplace-header-link-list">
                    <a href="https://marketplace1.zendesk.com/hc/en-gb">
                      Support
                    </a>
                  </li>
                  <li className="au-marketplace-header-link-list">
                    <a
                      styleName={this.props.location.pathname === '/contact-us' ? 'au-marketplace-header-active' : ''} 
                      href="/contact-us"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="row hide-desktop">
            <div className="col-md-12">
              <div className="au-marketplace-header-mobile-menu">
                <AUaccordion
                  header={ this.state.accordionOpen ? "Close menu" : "Open menu" }
                  open={ this.state.accordionOpen }
                  onOpen={ () => { this.openAccordion() } }
                  onClose={ () => { this.closeAccordion() } }
                >
                  <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
                    <div className="au-marketplace-header_mobile-link">
                      {this.props.isAuthenticated ? 
                      <span>
                        <a href={this.props.dashboardUrl}>{this.props.dashboardText}</a>
                        { (this.props.notificationCount && this.props.notificationCount !== 0) &&
                          <div className="notification">{this.props.notificationCount}</div>
                        }
                      </span>
                      : <a href="/2/signup">Sign up</a>}
                    </div>
                    <div className="au-marketplace-header_mobile-link">
                      {this.props.isAuthenticated ? <a href="/logout">Sign out</a> : <a href="/login">Sign in</a>}
                    </div>
                    <div className="au-marketplace-header_mobile-link">
                      <a href="/2/opportunities">
                        Opportunities
                      </a>
                    </div>
                    <div className="au-marketplace-header_mobile-link">
                      <a href="/search/sellers">
                        Seller Catalogue
                      </a>
                    </div>
                    <div className="au-marketplace-header_mobile-link">
                      <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000141616">
                        Insights
                      </a>
                    </div>
                    <div className="au-marketplace-header_mobile-link">
                      <a href="https://marketplace1.zendesk.com/hc/en-gb">
                        Support
                      </a>
                    </div>
                    <div className="au-marketplace-header_mobile-link">
                      <a href="/contact-us">
                        Contact
                      </a>
                    </div>
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
  registerUrl: PropTypes.string,
  registerText: PropTypes.string,
  loginUrl: PropTypes.string,
  dashboardUrl: PropTypes.string,
  logoutUrl: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  notificationCount: PropTypes.number
}

Header.defaultProps = {
    registerText: 'Register',
    dashboardText: 'Dashboard'
}

const mapStateToProps = (state) => {
  return {
    registerUrl: state.registerUrl,
    registerText: state.registerText,
    loginUrl: state.loginUrl,
    dashboardUrl: state.dashboardUrl,
    logoutUrl: state.logoutUrl,
    isAuthenticated: state.isAuthenticated,
    notificationCount: state.notificationCount
  };
};

export default withRouter(connect(mapStateToProps)(Header));
