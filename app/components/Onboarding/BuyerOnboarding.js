import React from 'react'
import * as styles from './Onboarding.scss'

const BuyerOnboarding = () =>
  <div className="row">
    <div className="col-sm-push-2 col-sm-8 col-xs-12">
      <h1 title="Welcome to the Marketplace">Welcome to the Marketplace</h1>
      <p>How can we help you?</p>
      <div className={styles.onBoardingItemWrapper}>
        <span>
          <h4>Read the Marketplace guides, contracts and compliance information</h4>
        </span>
        <span>
          <a href="https://marketplace1.zendesk.com/hc/en-gb/categories/115001542047-Buyer-guide-and-FAQs">
            Learn more
          </a>
        </span>
      </div>
      <div className={styles.onBoardingItemWrapper}>
        <span>
          <h4>Request quotes, resumes or proposals</h4>
        </span>
        <span>
          <a href="/buyers">Post a brief</a>
        </span>
      </div>
      <div className={styles.onBoardingItemWrapper}>
        <span>
          <h4>Need help writing a brief</h4>
        </span>
        <span>
          <a href="/contact-us">We are online now</a>
        </span>
      </div>
    </div>
  </div>

export default BuyerOnboarding
