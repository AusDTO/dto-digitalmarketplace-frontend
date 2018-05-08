import React from 'react'
import PropTypes from 'prop-types'
import RegisterComponent from '../../RegisterComponent'
import { returnPath } from './helper'
import { Link } from 'react-router-dom'
import logoGovCrest from './Government_crest.svg'

export const AuthWidget = (props, history) => {

    const _path = returnPath(history);

    {/*if (props.isAuthenticated) {
        return (
            <ul id="main-navigation" className="inline-links--inverted">
                <li><a href={props.dashboardUrl}>{props.dashboardText}</a></li>
                <li><a href={props.logoutUrl}>Sign out</a></li>
            </ul>
        )
    }

    return (
    <ul id="main-navigation" className="inline-links--inverted">
        <li><a href={props.registerUrl}>{props.registerText}</a></li>
        <li><a href={props.loginUrl.concat(_path)}>Sign in</a></li>
    </ul>
    )*/}

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
                      {props.isAuthenticated ? <a href={props.dashboardUrl}>{props.dashboardText}</a> : <a href="/2/signup" className="au-btn au-btn--secondary au-btn--dark">Sign up</a>}
                    </li>
                    <li>
                      {props.isAuthenticated ? <a href={props.logoutUrl}>Sign out</a> : <a href="/login" class="au-btn au-btn--dark">Sign in</a>}
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

AuthWidget.propTypes = {
    registerUrl: PropTypes.string,
    registerText: PropTypes.string,
    loginUrl: PropTypes.string,
    dashboardUrl: PropTypes.string,
    logoutUrl: PropTypes.string,
    isAuthenticated: PropTypes.bool
}

AuthWidget.defaultProps = {
    registerText: 'Register',
    dashboardText: 'Dashboard'
}

export default new RegisterComponent({'auth-header': AuthWidget})
