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
    return (
      <React.Fragment>
        <section>
          <div className="maintenance-banner">
            <div className="wrapper">
              <div className="row">
                {/* eslint-disable-next-line prettier/prettier */}
                <span className="maintenance-message">Digital Marketplace is now part of <a href="https://www.buyict.gov.au">BuyICT</a>.</span>
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
