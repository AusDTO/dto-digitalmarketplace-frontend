import React from 'react'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './BriefOutcomeChoice.scss'

const BriefOutcomeChoice = () => (
  <div>
    <div className={styles.header}>
      <AUheading level="1" size="xl">
        Select your approach
        <span className={styles.newBadge}>NEW</span>
      </AUheading>
    </div>
    <p className={styles.largerText}>
      Check with your procurement team to ensure you comply with your agency rules and legal requirements before
      approaching the market.
    </p>
    <div className={`row ${styles.container}`}>
      <div className="col-xs-12 col-md-5">
        <div className={styles.card}>
          <AUheading level="2" size="lg">
            Ask the market
          </AUheading>
          <p className={styles.largerText}>
            EOI/RFI approach to find sellers, learn about potential solutions, or experiment with prototypes before
            seeking proposals.
          </p>
          <AUheading level="3" size="sm">
            What you get
          </AUheading>
          <ul className={styles.list}>
            <li>Spreadsheet with up to 500 word responses to each criteria you provide.</li>
          </ul>
          <AUheading level="3" size="sm">
            Response timeframe
          </AUheading>
          <ul className={styles.flexList}>
            <li>Set your own timeframes (5 days minimum)</li>
          </ul>
          <p className={styles.buttons}>
            <a href={`${rootPath}/buyer-atm/create`} className="au-btn">
              Get started
            </a>
          </p>
        </div>
      </div>
      <div className="col-xs-12 col-md-5">
        <div className={styles.card}>
          <AUheading level="2" size="lg">
            Seek proposals and quotes
          </AUheading>
          <p className={styles.largerText}>Quickly seek quotes from selected sellers on the Digital Marketplace.</p>
          <AUheading level="3" size="sm">
            What you get
          </AUheading>
          <ul className={styles.list}>
            <li>Proposals and/or a completed response template used by your agency.</li>
          </ul>
          <AUheading level="3" size="sm">
            Response timeframe
          </AUheading>
          <ul className={styles.flexList}>
            <li>Set your own timeframes (2 days minimum)</li>
          </ul>
          <p className={styles.buttons}>
            <a href={`${rootPath}/buyer-rfx/create`} className="au-btn">
              Get started
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default BriefOutcomeChoice
