import React from 'react'

import styles from './Onboarding.scss'

const BuyerOnboarding = () => (
  <div className="row">
    <div className="col-sm-push-2 col-sm-8 col-xs-12">
      <h1 title="Welcome to the Marketplace" className={styles.contentHeading}>
        Welcome to the Marketplace
      </h1>
      <p>How can we help you?</p>
      <h2 className={styles.contentHeading}>Read the Marketplace guides, contracts and compliance information</h2>
      <span>
        <a href="https://marketplace1.zendesk.com/hc/en-gb/categories/115001542047-Buyer-guide-and-FAQs">Learn more</a>
      </span>
      <h2 className={styles.contentHeading}>Create a new opportunity for a digital specialist or outcome</h2>
      <span>
        <a href="/2/buyer-dashboard">Start a new brief</a>
      </span>
      <h2 className={styles.contentHeading}>Need help writing a brief?</h2>
      <span>
        All you need to do is <a href="https://marketplace1.zendesk.com/hc/en-gb/requests/new">contact us</a>
      </span>
    </div>
  </div>
)

export default BuyerOnboarding
