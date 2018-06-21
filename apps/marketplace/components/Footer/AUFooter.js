/* eslint-disable*/
import React from 'react'
import logoDTA from './dta_logo.svg'
import logoNISA from './NISA_logo.svg'

const AUFooter = () => (
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
              <p>
                An initiative of the <a href="https://www.dta.gov.au/">Digital Transformation Agency</a>. This program
                forms part of the National Innovation and Science{' '}
                <a href="https://innovation.gov.au/page/agenda">Agenda</a>. With the exception of the Commonwealth Coat
                of Arms and where otherwise noted, this work is licensed under the{' '}
                <a href="https://github.com/govau/uikit/blob/master/LICENSE" rel="external">
                  MIT license
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-md-pull-9 footer__logo">
          <div className="au-footer-logo-dta">
            <a href="https://www.dta.gov.au/">
              <div dangerouslySetInnerHTML={{ __html: logoDTA }} />
            </a>
          </div>
          <div className="au-footer-logo-nisa">
            <a href="https://innovation.gov.au/page/agenda">
              <div dangerouslySetInnerHTML={{ __html: logoNISA }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default AUFooter
