import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import logoGovCrest from './Government_crest.js'
import './Header.css'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accordionClosed: true
    }
  }

  openAccordion = () => {
    this.setState({ accordionClosed: false });
  }

  closeAccordion = () => {
    this.setState({ accordionClosed: true });
  }

  render() {
    const AdminHeaderActions = () =>
      <ul data-reactroot="" id="main-navigation" className="au-marketplace-header-inline-links">
        <li>
          <a href="/logout">Sign out</a>
        </li>
      </ul>

    const ApplicantHeaderActions = () =>
      <ul data-reactroot="" id="main-navigation" className="au-marketplace-header-inline-links">
        <li>
          <a href="/sellers/application">Continue application</a>
        </li>
        <li>
          <a href="/logout">Sign out</a>
        </li>
      </ul>

    const BuyerHeaderActions = () =>
      <AUaccordion closed header="Menu" speed={0.2}>
        <ul>
          <li>
            <a href="/2/buyer-dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/2/teams">Teams and people</a>
          </li>
          <li>
            <a href="/2/download-reports">Download reports</a>
          </li>
          <li>
            <a href="/logout">Sign out</a>
          </li>
        </ul>
      </AUaccordion>

    const SellerHeaderActions = () =>
      <ul data-reactroot="" id="main-navigation" className="au-marketplace-header-inline-links">
        <li>
          <a href="/2/seller-dashboard">Dashboard</a>
          {this.props.notificationCount && this.props.notificationCount > 0 ?
            <div className="notification">{this.props.notificationCount}</div>
            : ''
          }
        </li>
        <li>
          <a href="/logout">Sign out</a>
        </li>
      </ul>

    const UnauthenticatedHeaderActions = () =>
      <ul data-reactroot="" id="main-navigation" className="au-marketplace-header-inline-links">
        <li>
          <a href="/2/signup" className="au-btn au-btn--secondary au-btn--dark">
            Sign up
          </a>
        </li>
        <li>
          <a href="/2/login" className="au-btn au-btn--dark">
            Log in
          </a>
        </li>
      </ul>

    const CommonMobileLinks = () =>
      <React.Fragment>
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
          <a href="/2/insights">
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
      </React.Fragment>

    const AuthenticatedMobileLinks = props => {
      const { userType } = props

      return (
        <React.Fragment>
          <div className="au-marketplace-header_mobile-link">
            <span>
              <a href={this.props.dashboardUrl}>{this.props.dashboardText}</a>
              {(this.props.notificationCount && this.props.notificationCount !== 0) &&
                <div className="notification">{this.props.notificationCount}</div>
              }
            </span>
          </div>
          {userType === 'buyer' && (
            <div className="au-marketplace-header_mobile-link">
              <a href="/2/teams">Teams and People</a>
            </div>
          )}
          {userType === 'buyer' && (
            <div className="au-marketplace-header_mobile-link">
              <a href="/2/download-reports">Download reports</a>
            </div>
          )}
          <CommonMobileLinks />
          <div className="au-marketplace-header_mobile-link">
            <a href="/logout">Sign out</a>
          </div>
        </React.Fragment>
      )
    }

    const UnauthenticatedMobileLinks = () =>
      <React.Fragment>
        <div className="au-marketplace-header_mobile-link">
          <a href="/2/login">Sign in</a>
        </div>
        <div className="au-marketplace-header_mobile-link">
          <a href="/2/signup">Sign up</a>
        </div>
        <CommonMobileLinks />
      </React.Fragment>

    return (
      <React.Fragment>
        <section>
          <div className="maintenance-banner">
            <div className="wrapper">
              <div className="row">
                {/* eslint-disable-next-line prettier/prettier */}
                <span className="maintenance-message">Digital Marketplace is closed while it&apos;s moving to BuyICT. <a href="/api/2/r/buyict">Find out more</a>.</span>
              </div>
            </div>
          </div>
        </section>
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
                  <div className="au-marketplace-header-actions">
                    {this.props.isAuthenticated ? (
                      (this.props.userType === 'admin' && <AdminHeaderActions />) ||
                      (this.props.userType === 'applicant' && <ApplicantHeaderActions />) ||
                      (this.props.userType === 'buyer' && <BuyerHeaderActions />) ||
                      (this.props.userType === 'supplier' && <SellerHeaderActions />)
                    ) : (
                      <UnauthenticatedHeaderActions />
                    )}
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
                      <a href="/2/insights">
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
                    header={this.state.accordionClosed ? "Open menu" : "Close menu"}
                    closed={this.state.accordionClosed}
                    onOpen={() => { this.openAccordion() }}
                    onClose={() => { this.closeAccordion() }}
                  >
                    <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
                      {this.props.isAuthenticated
                        ? <AuthenticatedMobileLinks userType={this.props.userType} />
                        : <UnauthenticatedMobileLinks />}
                    </div>
                  </AUaccordion>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

Header.propTypes = {
  dashboardUrl: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  loginUrl: PropTypes.string,
  logoutUrl: PropTypes.string,
  notificationCount: PropTypes.number,
  registerText: PropTypes.string,
  registerUrl: PropTypes.string,
  userType: PropTypes.string
}

Header.defaultProps = {
  dashboardText: 'Dashboard',
  registerText: 'Register'
}

const mapStateToProps = (state) => {
  return {
    dashboardUrl: state.dashboardUrl,
    isAuthenticated: state.isAuthenticated,
    loginUrl: state.loginUrl,
    logoutUrl: state.logoutUrl,
    notificationCount: state.notificationCount,
    registerText: state.registerText,
    registerUrl: state.registerUrl,
    userType: state.userType
  };
};

export default withRouter(connect(mapStateToProps)(Header));
