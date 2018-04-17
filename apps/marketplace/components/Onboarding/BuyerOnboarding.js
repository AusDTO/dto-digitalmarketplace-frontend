import React from 'react'
import * as styles from './Onboarding.scss'

const BuyerOnboarding = () =>
  <div className="row">
    <div className="col-sm-push-2 col-sm-8 col-xs-12">
      <h1 title="Welcome to the Marketplace">Welcome to the Marketplace</h1>
      <p>How can we help you?</p>
      <div className={styles.onBoardingItemWrapper}>
        <span>
          <h2 className="au-display-lg">Read the Marketplace guides, contracts and compliance information</h2>
        </span>
        <span>
          <a href="https://marketplace1.zendesk.com/hc/en-gb/categories/115001542047-Buyer-guide-and-FAQs">
            Learn more
          </a>
        </span>
      </div>
      <div className={styles.onBoardingItemWrapper}>
        <span>
          <h2 className="au-display-lg">Create a new opportunity for a digital specialist or outcome</h2>
        </span>
        <span>
          <a href="/buyers">Start a new brief</a>
        </span>
      </div>
      <div className={styles.onBoardingItemWrapper}>
        <span>
          <h2 className="au-display-lg">Need help writing a brief?</h2>
        </span>
        <span>
          All you need to do is <a href="https://marketplace1.zendesk.com/hc/en-gb/requests/new">contact us</a>
        </span>
      </div>
    </div>
  </div>

export default BuyerOnboarding
