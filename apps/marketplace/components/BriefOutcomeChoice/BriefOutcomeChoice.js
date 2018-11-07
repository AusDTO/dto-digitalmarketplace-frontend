import React from 'react'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './BriefOutcomeChoice.scss'

const BriefOutcomeChoice = () => (
  <div>
    <div className={styles.header}>
      <AUheading level="1" size="xl">
        Select your approach
      </AUheading>
      <span className={styles.newBadge}>NEW</span>
    </div>
    <div className={`row ${styles.container}`}>
      <div className="col-xs-12 col-md-5">
        <div className={styles.card}>
          <AUheading level="2" size="lg">
            Ask the market
          </AUheading>
          <p className={styles.largerText}>
            EOI/RFI style suited to exploratory procurements. Uncover new expertise or trial products and emerging
            technologies.
          </p>
          <AUheading level="3" size="sm">
            What you get
          </AUheading>
          <ul>
            <li>150 word text responses from each seller in a spreadsheet for shortlisting.</li>
          </ul>
          <AUheading level="3" size="sm">
            Get responses within
          </AUheading>
          <ul className={styles.flexList}>
            <li>Choose 5 to 10 business days</li>
          </ul>
          <p className={styles.buttons}>
            <a href="/buyers/frameworks/digital-marketplace/requirements/digital-outcome" className="au-btn">
              Get started
            </a>
          </p>
        </div>
      </div>
      <div className="col-xs-12 col-md-5 col-md-offset-1">
        <div className={styles.card}>
          <AUheading level="2" size="lg">
            Get proposals/quotes
          </AUheading>
          <p className={styles.largerText}>
            Quickly seek quotes based on researched user needs and prioritised technical requirements.
          </p>
          <AUheading level="3" size="sm">
            What you get
          </AUheading>
          <ul>
            <li>Proposals in your requested format.</li>
            <li>Pre-populated evaluation spreadsheet.</li>
          </ul>
          <AUheading level="3" size="sm">
            Get response format within
          </AUheading>
          <ul className={styles.flexList}>
            <li>Set your own timeframes (2 days minimum)</li>
          </ul>
          <p className={styles.buttons}>
            <a href={`${rootPath}/buyer-rfq/create`} className="au-btn">
              Get started
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default BriefOutcomeChoice
