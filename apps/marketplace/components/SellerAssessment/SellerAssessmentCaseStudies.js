import React from 'react'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUdirectionLink from '@gov.au/direction-links/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './SellerAssessmentReviewStage.scss'

const SellerAssessmentCaseStudies = props => (
  <div>
    <AUdirectionLink link={`${rootPath}/seller-dashboard/categories`} text="back to dashboard" direction="left" />

    <AUheading level="1" size="lg">
      {props.caseStudies.categoryName} case study
    </AUheading>
    <div className={styles.spacer} />

    {props.caseStudies.caseStudiesData &&
      props.caseStudies.caseStudiesData.map(value => (
        <React.Fragment key={value}>
          <AUheading level="2" size="lg">
            {value.data.title}
          </AUheading>

          <AUheading level="2" size="md">
            Client
          </AUheading>
          <p className={styles.reviewText}>{value.data.client}</p>

          <AUheading level="2" size="md">
            Referee details
          </AUheading>
          <p className={styles.reviewText}>{value.data.referee_name}</p>
          <p className={styles.reviewText}>{value.data.referee_position}</p>
          <p className={styles.reviewText}>{value.data.referee_email}</p>

          <AUheading level="2" size="md">
            Project date
          </AUheading>
          <p className={styles.reviewText}>{value.data.timeframe}</p>

          <AUheading level="2" size="md">
            Responsible for
          </AUheading>
          <p className={styles.reviewText}>{value.data.roles}</p>

          <AUheading level="2" size="md">
            Challenge
          </AUheading>
          <p className={styles.reviewText}>{value.data.opportunity}</p>

          <AUheading level="2" size="md">
            Approach
          </AUheading>
          <p className={styles.reviewText}>{value.data.approach}</p>

          <AUheading level="2" size="md">
            Outcomes and benefits
          </AUheading>
          <p className={styles.reviewText}>{value.data.outcome}</p>
          <div className={styles.spacer} />
        </React.Fragment>
      ))}
  </div>
)

export default SellerAssessmentCaseStudies
