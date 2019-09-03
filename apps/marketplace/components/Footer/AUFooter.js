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
              <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000666496">About us</a>
            </li>
            <li>
              <a href="/contact-us">Contact us</a>
            </li>
            <li>
              <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360001037036">Terms of Use</a>
            </li>
            <li>
              <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360001027895">Privacy</a>
            </li>
            <li>
              <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360001027915">Security</a>
            </li>
            <li>
              <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360001028135">Disclaimer</a>
            </li>
            <li>
              <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360001037656">Copyright</a>
            </li>
          </ul>
          <div className="au-footer__end">
            <div className="footer__content footer__legal">
              <p>
                An initiative of the <a href="https://www.dta.gov.au/">Digital Transformation Agency</a>. This program
                forms part of the National Innovation and Science{' '}
                <a href="https://www.industry.gov.au/strategies-for-the-future/boosting-innovation-and-science">
                  Agenda
                </a>
                . With the exception of the Commonwealth Coat of Arms and where otherwise noted, this work is licensed
                under the{' '}
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
            <a href="https://www.industry.gov.au/strategies-for-the-future/boosting-innovation-and-science">
              <div dangerouslySetInnerHTML={{ __html: logoNISA }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default AUFooter
