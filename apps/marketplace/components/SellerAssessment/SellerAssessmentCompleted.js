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
    <p>The Marketplace will assess your submitted pricing and responses against the criteria you selected.</p>
    <p>
      <strong>How long does assessment take?</strong>
      <br />
      The time we take to assess your criteria is dependent on volume, seasonal peaks, complex cases and incomplete
      submissions. We will endeavour to assess your criteria in a reasonable timeframe.
      <br />
      <br />
      If you submit your request for assessment within 2 days of the closing date, we cannot guarantee that you will be
      assessed in time to respond.
    </p>
  </div>
)

SellerAssessmentCompleted.propTypes = {
  contactEmail: PropTypes.string.isRequired
}

export default SellerAssessmentCompleted
