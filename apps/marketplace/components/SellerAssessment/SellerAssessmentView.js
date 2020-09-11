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

    {props.evidence &&
      props.evidence.map((value, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <AUheading level="1" size="xl">
              {value.category_name} Assessment
              <div className={styles.spacer} />
            </AUheading>
          )}
          {index === 0 && (
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
          )}
          {index === 0 && (
            <AUheading level="2" size="lg">
              Maximum daily rate
            </AUheading>
          )}
          {index === 0 && <p>${value.maxDailyRate} (including GST)</p>}
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
    {/* {props.evidence &&
      props.evidence.map((value, index) => (
        <React.Fragment key={value}>
          <AUheading level="1" size="xl">
            {value.domain_name} Assessment
          </AUheading>
          {value.status === 'approved' && (
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
          )}
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
          <p className={styles.reviewText}>{value.domain_criteria[value.criteria[index]].name}</p>
          <AUheading level="2" size="md">
            Referee&apos;s name and number
          </AUheading>
          <p className={styles.reviewText}>
            {value.evidence_data[value.criteria[index]].refereeName}: {value.evidence_data[value.criteria[index]].refereeNumber}
          </p>
          <AUheading level="2" size="md">
            Project date
          </AUheading>
          <p className={styles.reviewText}>
            {value.evidence_data[value.criteria[index]].startDate} - {value.evidence_data[value.criteria[index]].endDate}
          </p>
          <AUheading level="2" size="md">
            Background
          </AUheading>
          <p className={styles.reviewText}>{value.evidence_data[value.criteria[index]].background}</p>
          <AUheading level="2" size="md">
            Evidence of meeting the criteria
          </AUheading>
          <p className={styles.reviewText}>{value.evidence_data[value.criteria[index]].response}</p>
          {index !== value.criteria.length - 1 && <div className={styles.spacer} />}
        </React.Fragment>
      ))} */}

    {/* {props.evidence.status === 'approved' && (
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
    )}

    <AUheading level="2" size="lg">
      Maximum daily rate
    </AUheading>
    <p>${props.evidence.maxDailyRate} (including GST)</p>
    <AUheading level="2" size="lg">
      Evidence
    </AUheading>

    {props.evidence.criteria &&
      props.evidence.criteria.map((criteriaId, index) => (
        <React.Fragment key={criteriaId}>
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
      ))} */}
  </div>
)

SellerAssessmentView.propTypes = {
  evidence: PropTypes.object.isRequired
}

export default SellerAssessmentView
