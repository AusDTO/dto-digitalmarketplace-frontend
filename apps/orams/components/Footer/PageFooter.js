/* eslint-disable  react/no-danger */
import React from 'react'
import AUfooter, { AUfooterNav } from '@gov.au/footer/lib/js/react.js'
import styles from './PageFooter.scss'
import logoGovCrest from './ato-logo-02.svg'

const PageFooter = () => (
  <div className="orams-footer">
    <AUfooter>
      <div className={styles.footerWrapper}>
        <AUfooterNav>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <h2 className="au-display-md">
                ORAMS
                <small className={styles.footerSmallText}>brought to you by the Digital Marketplace</small>
              </h2>
              <ul className="au-link-list">
                <li>
                  <a href="/orams/terms-of-use">Terms of Use</a>
                </li>
                <li>
                  <a href="/orams/privacy-policy">Privacy</a>
                </li>
                <li>
                  <a href="/orams/security">Security</a>
                </li>
                <li>
                  <a href="/orams/disclaimer">Disclaimer</a>
                </li>
                <li>
                  <a href="/orams/copyright">Copyright</a>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className={styles.logoSection}>
                <div className={styles.logoGovcrest}>
                  <div dangerouslySetInnerHTML={{ __html: logoGovCrest }} />
                </div>
                <div className={styles.footerSmallText}>© Copyright Australian Taxation Office</div>
              </div>
            </div>
          </div>
        </AUfooterNav>
      </div>
    </AUfooter>
  </div>
)

export default PageFooter
