import React from 'react'
import PropTypes from 'prop-types'
import RegisterComponent from '../../RegisterComponent'
import { returnPath } from './helper'
import { Link } from 'react-router-dom'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import logoGovCrest from './Government_crest.svg'

export const AuthWidget = (props, history) => {

    const _path = returnPath(history);

    return (
      <section className="au-marketplace-header">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-8 col-xs-12 au-marketplace-header-logo-section">
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
            <div className="col-md-4 col-sm-4 col-xs-12 hide-mobile no-padding-tablet">
              <div className="au-marketplace-header-user-nav">
                <div id="react-bundle-auth-header-state" />
                <div id="react-bundle-auth-header">
                  <ul data-reactroot="" id="main-navigation" className="au-marketplace-header-inline-links">
                    <li>
                      {props.isAuthenticated ? <a href={props.dashboardUrl}>{props.dashboardText}</a> : <a href="/2/signup" className="au-btn au-btn--secondary au-btn--dark">Sign up</a>}
                    </li>
                    <li>
                      {props.isAuthenticated ? <a href={props.logoutUrl}>Sign out</a> : <a href="/login" className="au-btn au-btn--dark">Sign in</a>}
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
          <div className="row hide-desktop">
            <div className="col-md-12">
              <div className="au-marketplace-header-mobile-menu">
                <AUaccordion dark header="Open menu">
                  <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
                    <div className="au-marketplace-header_mobile-link">
                      {props.isAuthenticated ? <a href={props.dashboardUrl}>{props.dashboardText}</a> : <a href="/2/signup">Sign up</a>}
                    </div>
                    <div className="au-marketplace-header_mobile-link">
                      {props.isAuthenticated ? <a href="/logout">Sign out</a> : <a href="/login">Sign in</a>}
                    </div>
                    <div className="au-marketplace-header_mobile-link">
                      <a href="/digital-marketplace/opportunities?status=live">
                        Opportunities
                      </a>
                    </div>
                    <div className="au-marketplace-header_mobile-link">
                      <a href="/search/sellers">
                        Seller Catalogue
                      </a>
                    </div>
                    <div className="au-marketplace-header_mobile-link">
                      <a href="../templates">
                        How it works
                      </a>
                    </div>
                    <div className="au-marketplace-header_mobile-link">
                      <a href="/insights">
                        Insights
                      </a>
                    </div>
                    <div className="au-marketplace-header_mobile-link">
                      <a href="https://marketplace1.zendesk.com/hc/en-gb">
                        Support
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
