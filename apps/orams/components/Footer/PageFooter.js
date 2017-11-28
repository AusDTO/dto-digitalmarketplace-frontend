/* eslint-disable  react/no-danger */
import React from 'react'
import Footer, { FooterNav } from '@gov.au/footer'
import styles from './PageFooter.scss'
import logoGovCrest from './ato-logo-02.svg'

const PageFooter = () =>
  <div className="orams-footer">
    <Footer>
      <div className={styles.footerWrapper}>
        <FooterNav>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <h2 className={styles.title}>ORAMS</h2>
              <h2 className={styles.subtitle}>brought to you by the Digital Marketplace</h2>
              <ul className="uikit-link-list">
                <li>
                  <a href="/orams/terms-of-use">Terms of Use</a>
                </li>
                <li>
                  <a href="/orams/privacy-policy">Privacy</a>
                </li>
                <li>
                  <a href="/security">Security</a>
                </li>
                <li>
                  <a href="/disclaimer">Disclaimer</a>
                </li>
                <li>
                  <a href="/disclaimer">Copyright</a>
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
        </FooterNav>
      </div>
    </Footer>
  </div>

export default PageFooter
