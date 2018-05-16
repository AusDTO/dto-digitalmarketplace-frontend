/* eslint-disable*/
import React from 'react'
import logoDTA from './DTA_logo_white.svg'
import logoNISA from './NISA_Logo_white.svg'

const AUFooter = () =>
  <footer className="au-footer footer au-body au-body--dark au-footer--dark " role="contentinfo">
    <div className="wrapper">
      <div className="row">
        <div className="col-md-offset-1 col-md-8 col-md-push-3">
          <ul className="au-link-list au-link-list--inline">
            <li>
              <a href="/about-us">About us</a>
            </li>
            <li>
              <a href="/contact-us">Contact us</a>
            </li>
            <li>
              <a href="/terms-of-use">Terms of Use</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy</a>
            </li>
            <li>
              <a href="/security">Security</a>
            </li>
            <li>
              <a href="/disclaimer">Disclaimer</a>
            </li>
            <li>
              <a href="/copyright">Copyright</a>
            </li>
          </ul>
          <div className="au-footer__end">
            <div className="footer__content footer__legal">
              <p>© Commonwealth of Australia.
              With the exception of the Commonwealth Coat of Arms and where otherwise noted,
              this work is licensed under the <a href="https://github.com/govau/uikit/blob/master/LICENSE" rel="external">MIT license</a>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-md-pull-9 footer__logo">
          <div className="au-footer-logo-dta">
            <div dangerouslySetInnerHTML={{ __html: logoDTA }} />
          </div>
          <div className="au-footer-logo-nisa">
            <div dangerouslySetInnerHTML={{ __html: logoNISA }} />
          </div>
        </div>
      </div>
    </div>
  </footer>

export default AUFooter
