import React from 'react'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './SellerAssessmentCompleted.scss'

const SellerAssessmentCompleted = () => (
  <div>
    <AUpageAlert as="success">
      <AUheading level="1" size="md">
        Your assessment has been submitted.
      </AUheading>
    </AUpageAlert>
    <p className={styles.buttons}>
      <a href={`${rootPath}/seller-dashboard`} className="au-btn au-btn--secondary">
        Return to dashboard
      </a>
    </p>
  </div>
)

export default SellerAssessmentCompleted
