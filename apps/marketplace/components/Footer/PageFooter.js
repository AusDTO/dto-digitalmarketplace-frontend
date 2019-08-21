/* eslint-disable  react/no-danger */
import React from 'react'
import AUfooter, { AUfooterNav, AUfooterEnd } from '@gov.au/footer/lib/js/react.js'
import styles from './PageFooter.scss'
import logoGovCrest from './logo_govcrest.svg'
import logoNisa from './logo_nisa.svg'

const PageFooter = () => (
  <AUfooter className={styles.footer}>
    <div className="wrapper">
      <AUfooterNav>
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <h2 className="au-display-sm">About</h2>
            <ul className="au-link-list">
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
            </ul>
          </div>

          <div className="col-md-3 col-sm-6">
            <h2 className="au-display-sm">Using the Digital Marketplace</h2>
            <ul className="au-link-list">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/search/sellers">Seller catalogue</a>
              </li>
              <li>
                <a href="https://marketplace1.zendesk.com/hc/en-gb/categories/115001542047-Buyer-guide-and-FAQs">
                  Buyer&rsquo;s guide and FAQs
                </a>
              </li>
              <li>
                <a href="https://marketplace1.zendesk.com/hc/en-gb/categories/115001540368-Seller-guide-and-FAQs">
                  Seller&rsquo;s guide and FAQs
                </a>
              </li>
              <li>
                <a href="https://marketplace1.zendesk.com/">Support</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-sm-6">
            <h2 className="au-display-sm">
              Digital Marketplace brought to you by the{' '}
              <a rel="external" href="https://www.dta.gov.au/">
                DTA
              </a>
            </h2>
            <ul className="au-link-list">
              <li>
                <a rel="external" href="https://www.dta.gov.au/tags/digital-marketplace/">
                  DTA blog
                </a>
              </li>
              <li>
                <a rel="external" href="https://twitter.com/DTA">
                  DTA twitter
                </a>
              </li>
              <li>
                <a rel="external" href="https://github.com/AusDTO">
                  DTA github
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-sm-6">
            <h2 className="au-display-sm">DTA resources</h2>
            <ul className="au-link-list">
              <li>
                <a rel="external" href="https://www.dta.gov.au/our-work/">
                  Our work
                </a>
              </li>
              <li>
                <a rel="external" href="https://www.dta.gov.au/standard/">
                  Our standard
                </a>
              </li>
              <li>
                <a
                  rel="external"
                  href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000189856-Digital-Sourcing"
                >
                  DTA digital sourcing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </AUfooterNav>

      <AUfooterEnd>
        <div className="row">
          <div className="col-sm-12">
            <div className={styles.logoGovcrest}>
              <div dangerouslySetInnerHTML={{ __html: logoGovCrest }} />
            </div>
            <div className={styles.logoNisa}>
              <div dangerouslySetInnerHTML={{ __html: logoNisa }} />
            </div>
            <div className={styles.footerSmallText}>
              This program forms part of the National Innovation and Science Agenda.
              <br />
              Visit{' '}
              <strong>
                <a href="https://innovation.gov.au/">Innovation.gov.au</a>
              </strong>{' '}
              to find out more.
            </div>
          </div>
        </div>
      </AUfooterEnd>
    </div>
  </AUfooter>
)

export default PageFooter
