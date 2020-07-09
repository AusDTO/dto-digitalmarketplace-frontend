import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUdirectionLink from '@gov.au/direction-links/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './SellerAssessmentReviewStage.scss'
import main from '../../main.scss'
const SellerAssessmentCaseStudies = props => (
  <div>
    <AUdirectionLink link={`${rootPath}/seller-dashboard/categories`} text="back to dashboard" direction="left" />

    <AUheading level="1" size="xl">
      {props.service} Case Studies
    </AUheading>
    <div className={styles.spacer} />
    <AUheading level="2" size="md">
      {props.title}
    </AUheading>

    <AUheading level="2" size="md">
      Client
    </AUheading>
    <p className={styles.reviewText}>{props.client}</p>

    <AUheading level="2" size="md">
      Challenge
    </AUheading>
    <p className={styles.reviewText}>{props.challenge}</p>

    <AUheading level="2" size="md">
      Timeframe
    </AUheading>
    <p className={styles.reviewText}>{props.timeframe}</p>

    <AUheading level="2" size="md">
      Approach
    </AUheading>
    <p className={styles.reviewText}>{props.approach}</p>
    
  </div>
)

SellerAssessmentCaseStudies.propTypes = {
  domain: PropTypes.object.isRequired
}

export default SellerAssessmentCaseStudies
