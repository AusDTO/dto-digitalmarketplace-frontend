import React from 'react'
import PropTypes from 'prop-types'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUdirectionLink from '@gov.au/direction-links/lib/js/react.js'
import { rootPath } from 'marketplace/routes'

const SellerAssessmentCompleted = props => (
  <div>
    <AUdirectionLink link={`${rootPath}/seller-dashboard`} text="back to dashboard" direction="left" />
    <AUpageAlert as="success">
      <AUheading level="1" size="lg">
        Your assessment has been submitted.
      </AUheading>
      <p>We have sent a confirmation email to &apos;{props.contactEmail}&apos;.</p>
    </AUpageAlert>
    <AUheading level="2" size="lg">
      What happens next
    </AUheading>
    <p>We will assess the rate and evidence against the criteria you selected.</p>
    <AUheading level="3" size="md">
      If the assessment is successful:
    </AUheading>
    <ol>
      <li>We will email {props.contactEmail} to let you know you are approved.</li>
      <li>You will be able to respond to &quot;open to all&quot; opportunities in the category.</li>
      <li>
        You will be able to respond to &quot;open to selected&quot; opportunities in the category, if the buyer has
        invited you.
      </li>
    </ol>
    <AUheading level="3" size="md">
      If the assessment is not successful:
    </AUheading>
    <ol>
      <li>We will email {props.contactEmail} with a link to view the assessment team&apos;s feedback.</li>
      <li>You can update your submission and resubmit for assessment.</li>
    </ol>
  </div>
)

SellerAssessmentCompleted.propTypes = {
  contactEmail: PropTypes.string.isRequired
}

export default SellerAssessmentCompleted
