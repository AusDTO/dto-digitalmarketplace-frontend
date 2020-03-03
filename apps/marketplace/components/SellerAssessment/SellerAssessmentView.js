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


    
    <AUheading level="2" size="lg">
    Maximum daily rate
    </AUheading>

    <AUheading level="2" size="lg">
    Evidence
    </AUheading>

    <AUheading level="2" size="md">
              Criteria
    </AUheading>
            {/* <p className={styles.reviewText}>{getCriteriaName(criteriaId, props.meta.domain.criteria)}</p> */}
            <AUheading level="2" size="md">
              Client
            </AUheading>
            {/* <p className={styles.reviewText}>{props[props.model].evidence[criteriaId].client}</p> */}
            <AUheading level="2" size="md">
              Referee&apos;s name and number
            </AUheading>
  </div>

)

SellerAssessmentCompleted.propTypes = {
  contactEmail: PropTypes.string.isRequired
}

export default SellerAssessmentCompleted
