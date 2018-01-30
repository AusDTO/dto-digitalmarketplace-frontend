import React from 'react'
import * as styles from './Onboarding.scss'

const SellerOnboarding = () => (
  <div className="row">
    <div className="col-sm-push-2 col-sm-8 col-xs-12">
      <h1 title="Welcome to the Marketplace">Welcome to the Marketplace</h1>
      <p>What do you want to do next?</p>
      <div className={styles.onBoardingItemWrapper}>
        <span>
          <h2 className="uikit-display-2">List my digital offering on the Marketplace</h2>
        </span>
        <span>
          <a href="/sellers/application">Set up my shopfront</a>
        </span>
      </div>
      <div className={styles.onBoardingItemWrapper}>
        <span>
          <h2 className="uikit-display-2">Apply for an opportunity listed on the Marketplace</h2>
        </span>
        <span>
          <a href="/digital-marketplace/opportunities">Browse opportunities</a>
        </span>
      </div>
      <div className={styles.onBoardingItemWrapper}>
        <span>
          <h2 className="uikit-display-2">Learn about adding case studies to your shopfront</h2>
        </span>
        <span>
          <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/115011407668-Adding-case-studies">
            Adding a case study
          </a>
        </span>
      </div>
    </div>
  </div>
)

export default SellerOnboarding
