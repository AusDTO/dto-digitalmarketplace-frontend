import React from 'react'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUdirectionLink from '@gov.au/direction-links/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './SellerAssessmentReviewStage.scss'

const SellerAssessmentCaseStudies = props => (
  <div>
    <AUdirectionLink link={`${rootPath}/seller-dashboard/categories`} text="back to dashboard" direction="left" />
    <AUheading level="1" size="xl">
      {props.caseStudies.domainName} case study
    </AUheading>
    <div className={styles.spacer} />

    {props.caseStudies.caseStudiesId &&
      props.caseStudies.caseStudiesId.map((id, index) => (
        <React.Fragment key={id}>
          <AUheading level="2" size="lg">
            {props.caseStudies.data[id].title}
          </AUheading>
          <AUheading level="2" size="md">
            Client
          </AUheading>
          <p className={styles.reviewText}>{props.caseStudies.data[id].client}</p>

          <AUheading level="2" size="md">
            Referee details
          </AUheading>
          <p className={styles.reviewText}>{props.caseStudies.data[id].referee_name}</p>
          <p className={styles.reviewText}>{props.caseStudies.data[id].referee_email}</p>
          <p className={styles.reviewText}>{props.caseStudies.data[id].referee_position}</p>

          <AUheading level="2" size="md">
            Project date
          </AUheading>
          <p className={styles.reviewText}>{props.caseStudies.data[id].timeframe}</p>

          <AUheading level="2" size="md">
            Responsible for
          </AUheading>
          <p className={styles.reviewText}>{props.caseStudies.data[id].roles}</p>

          <AUheading level="2" size="md">
            Challenge
          </AUheading>
          <p className={styles.reviewText}>{props.caseStudies.data[id].opportunity}</p>

          <AUheading level="2" size="md">
            Approach
          </AUheading>
          <p className={styles.reviewText}>{props.caseStudies.data[id].approach}</p>

          <AUheading level="2" size="md">
            Outcomes and benefits
          </AUheading>
          <p className={styles.reviewText}>{props.caseStudies.data[id].outcome}</p>
          {index !== props.caseStudies.caseStudiesId.length - 1 && <div className={styles.spacer} />}
        </React.Fragment>
      ))}
  </div>
)

export default SellerAssessmentCaseStudies
