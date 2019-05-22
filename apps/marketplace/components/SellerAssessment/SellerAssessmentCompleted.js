import React from 'react'
import PropTypes from 'prop-types'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './SellerAssessmentCompleted.scss'

const SellerAssessmentCompleted = props => (
  <div>
    <AUpageAlert as="success">
      <AUheading level="1" size="md">
        Your assessment has been submitted.
      </AUheading>
    </AUpageAlert>
    <p>We have sent a confirmation email to &apos;{props.contactEmail}&apos;.</p>
    <AUheading level="2" size="lg">
      What happens next
    </AUheading>
    <p>We will assess the rate and evidence against the criteria you selected.</p>
    <AUheading level="3" size="md">
      If the assessment is successful:
    </AUheading>
    <ol>
      <li>We will email {props.contactEmail} to let you know you are approved.</li>
      <li>You will be able to respond to any &quot;open to all&quot; opportunity in that category.</li>
      <li>Select &apos;Apply for opportunity&apos; to submit your response.</li>
    </ol>
    <AUheading level="3" size="md">
      If the assessment is not successful:
    </AUheading>
    <ol>
      <li>We will email {props.contactEmail} with a link to view the assessment team&apos;s feedback.</li>
      <li>You can update your submission and resubmit for assessment.</li>
    </ol>
    <p className={styles.buttons}>
      <a href={`${rootPath}/seller-dashboard`} className="au-btn au-btn--secondary">
        Return to dashboard
      </a>
    </p>
  </div>
)

SellerAssessmentCompleted.propTypes = {
  contactEmail: PropTypes.string.isRequired
}

export default SellerAssessmentCompleted
