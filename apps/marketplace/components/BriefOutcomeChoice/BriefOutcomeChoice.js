import React from 'react'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './BriefOutcomeChoice.scss'

const BriefOutcomeChoice = () => (
  <div>
    <AUheading level="1" size="xl">
      Select your approach
    </AUheading>
    <div className={`row ${styles.container}`}>
      <div className="col-xs-12 col-md-5">
        <div className={styles.card}>
          <AUheading level="2" size="md">
            Ask the market
            <span className={`${styles.badge} ${styles.badgeAll}`}>Open to all</span>
          </AUheading>
          <p>
            EOI/RFI style suited to exploratory procurements. Uncover new expertise or trial products and emerging
            technologies.
          </p>
          <AUheading level="3" size="sm">
            What you provide
          </AUheading>
          <ul>
            <li>A summary of the problem to explore</li>
            <li>Assessment criteria</li>
            <li>Closing date for responses</li>
          </ul>
          <AUheading level="3" size="sm">
            Who can respond
          </AUheading>
          <p>Any assessed seller in the selected panel category</p>
          <AUheading level="3" size="sm">
            What you get after closing
          </AUheading>
          <p>150 word responses in a spreadsheet for shortlisting</p>
          <AUheading level="3" size="sm">
            Get responses within
          </AUheading>
          <p className={styles.flexGrow}>5 to 10 business days</p>
          <p className={styles.buttons}>
            <a href="#template" className="au-btn au-btn--secondary">
              Download Template
            </a>
            <a href="/buyers/frameworks/digital-marketplace/requirements/digital-outcome" className="au-btn">
              Start
            </a>
          </p>
        </div>
      </div>
      <div className="col-xs-12 col-md-5 col-md-offset-1">
        <div className={styles.card}>
          <AUheading level="2" size="md">
            RFX
            <span className={`${styles.badge} ${styles.badgeSelected}`}>Open to selected</span>
          </AUheading>
          <p>
            Get solution based submissions based on well understood technical requirements and researched user needs.
          </p>
          <AUheading level="3" size="sm">
            What you provide
          </AUheading>
          <ul>
            <li>Requirements document</li>
            <li>Submission format</li>
            <li>Assessment criteria</li>
            <li>Closing date for submissions</li>
          </ul>
          <AUheading level="3" size="sm">
            Who can respond
          </AUheading>
          <p>Only assessed sellers you select</p>
          <AUheading level="3" size="sm">
            What you get after closing
          </AUheading>
          <ul>
            <li>Submissions in your requested format</li>
            <li>Evaluation spreadsheet</li>
          </ul>
          <AUheading level="3" size="sm">
            Get responses within
          </AUheading>
          <ul className={styles.flexGrow}>
            <li>5 business days minimum</li>
            <li>Set longer timeframes for more complex requests</li>
          </ul>
          <p className={styles.buttons}>
            <a href="#template" className="au-btn au-btn--secondary">
              Download Template
            </a>
            <a href={`${rootPath}/buyer-rfq/create`} className="au-btn">
              Start
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default BriefOutcomeChoice
