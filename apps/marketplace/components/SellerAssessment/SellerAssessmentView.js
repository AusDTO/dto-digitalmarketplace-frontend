import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUdirectionLink from '@gov.au/direction-links/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './SellerAssessmentReviewStage.scss'
import main from '../../main.scss'

const SellerAssessmentView = props => (
  <div>
    <AUdirectionLink link={`${rootPath}/seller-dashboard/categories`} text="back to dashboard" direction="left" />

    <AUheading level="1" size="xl">
      {props.evidence.domainName} Assessment
    </AUheading>

    <AUheading level="2" size="lg">
      Maximum daily rate
    </AUheading>
    <p>${props.evidence.maxDailyRate} (including GST)</p>
    <AUheading level="2" size="lg">
      Evidence
    </AUheading>

    {props.evidence.criteria &&
      props.evidence.criteria.map((criteriaId, index) => (
        <React.Fragment key={index}>
          <AUheading level="2" size="md">
            Criteria
          </AUheading>
          <p className={styles.reviewText}>{props.evidence.domainCriteria[criteriaId].name}</p>
          <AUheading level="2" size="md">
            Client
          </AUheading>
          <p className={styles.reviewText}>{props.evidence.evidence[criteriaId].client}</p>
          <AUheading level="2" size="md">
            Referee&apos;s name and number
          </AUheading>
          <p className={styles.reviewText}>
            {props.evidence.evidence[criteriaId].refereeName}: {props.evidence.evidence[criteriaId].refereeNumber}
          </p>
          <AUheading level="2" size="md">
            Project date
          </AUheading>
          <p className={styles.reviewText}>
            {props.evidence.evidence[criteriaId].startDate} - {props.evidence.evidence[criteriaId].endDate}
          </p>
          <AUheading level="2" size="md">
            Background
          </AUheading>
          <p className={styles.reviewText}>{props.evidence.evidence[criteriaId].background}</p>
          <AUheading level="2" size="md">
            Evidence of meeting the criteria
          </AUheading>
          <p className={styles.reviewText}>{props.evidence.evidence[criteriaId].response}</p>
          {index !== props.evidence.criteria.length - 1 && <div className={styles.spacer} />}
        </React.Fragment>
      ))}
  </div>
)

SellerAssessmentView.propTypes = {
  evidence: PropTypes.object.isRequired
}

export default SellerAssessmentView
