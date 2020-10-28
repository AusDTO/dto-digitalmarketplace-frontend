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
{/* 
    <AUheading level="1" size="xl">
            {value.category} Assessment
            <div className={styles.spacer} />
          </AUheading> */}
          <p>
            You cannot edit your request for approved categories. If you want to change your rate, please{' '}
            <a
              href="https://marketplace1.zendesk.com/hc/en-gb/requests/new"
              rel="noopener noreferrer"
              target="_blank"
              className={main.marginRight1}
            >
              contact our support team.
            </a>
          </p>



    {props.evidence.evidence &&
      props.evidence.evidence.map(value => (
        <React.Fragment key={value}>
          <AUheading level="2" size="lg">
            Maximum daily rate
          </AUheading>
          <p>${value.maxDailyRate} (including GST)</p>
          <AUheading level="2" size="lg">
            Evidence
          </AUheading>
          <AUheading level="2" size="md">
            Criteria
          </AUheading>
          <p className={styles.reviewText}>{value.domain_criteria_name}</p>
          <AUheading level="2" size="md">
            Referee&apos;s name and number
          </AUheading>
          <p className={styles.reviewText}>
            {value.evidence_data.refereeName}: {value.evidence_data.refereeNumber}
          </p>
          <AUheading level="2" size="md">
            Project date
          </AUheading>
          <p className={styles.reviewText}>
            {value.evidence_data.startDate} - {value.evidence_data.endDate}
          </p>
          <AUheading level="2" size="md">
            Background
          </AUheading>
          <p className={styles.reviewText}>{value.evidence_data.background}</p>
          <AUheading level="2" size="md">
            Evidence of meeting the criteria
          </AUheading>
          <p className={styles.reviewText}>{value.evidence_data.response}</p>
          {<div className={styles.spacer} />}
        </React.Fragment>
      ))}
  </div>
)

SellerAssessmentView.propTypes = {
  evidence: PropTypes.object.isRequired
}

export default SellerAssessmentView
