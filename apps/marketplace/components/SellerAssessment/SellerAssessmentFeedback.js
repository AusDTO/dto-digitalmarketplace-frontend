import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import Tick from 'marketplace/components/icons/Tick/Tick'
import styles from './SellerAssessmentFeedback.scss'

const getGoodCriteriaCount = criteria => {
  let count = 0
  Object.keys(criteria).map(id => {
    if (!criteria[id].has_feedback) {
      count += 1
    }
    return true
  })
  return count
}

const renderCriteriaFeedback = (criteriaId, criteria) => {
  let output = <div />
  if (
    criteria[criteriaId] &&
    criteria[criteriaId].has_feedback &&
    criteria[criteriaId].assessment &&
    criteria[criteriaId].assessment.reason
  ) {
    output = (
      <ol>
        <li className={styles.reason}>
          {criteria[criteriaId].assessment.reason}
          {criteria[criteriaId].assessment.feedback && (
            <span className={styles.feedback}>{criteria[criteriaId].assessment.feedback}</span>
          )}
        </li>
      </ol>
    )
  }
  return output
}

const SellerAssessmentFeedback = props => (
  <div>
    <p>
      <a href={`${rootPath}/seller-dashboard`}>← back to dashboard</a>
    </p>
    <AUheading level="1" size="xl">
      Outcome
    </AUheading>
    <p>Your assessment for {props.feedback.domainName} was rejected.</p>
    {Object.keys(props.feedback.criteria).length > 0 && (
      <React.Fragment>
        <AUheading level="2" size="lg">
          Feedback
        </AUheading>
        <p>
          {props.feedback.criteriaNeeded} criteria are required to be successful.{' '}
          {getGoodCriteriaCount(props.feedback.criteria)} criteria were demonstrated.
        </p>
        <ul className={styles.feedbackList}>
          {Object.keys(props.feedback.criteria).map(criteriaId => (
            <li key={criteriaId}>
              {!props.feedback.criteria[criteriaId].has_feedback && <Tick colour="#36865f" className={styles.icon} />}
              {props.feedback.criteria[criteriaId].name}
              {renderCriteriaFeedback(criteriaId, props.feedback.criteria)}
            </li>
          ))}
        </ul>
        <AUheading level="2" size="lg">
          Next steps
        </AUheading>
        <p>
          You can incorporate the feedback and{' '}
          <a href={`${rootPath}/seller-assessment/create/${props.feedback.domainId}`}>request assessment</a> again.
        </p>
      </React.Fragment>
    )}
  </div>
)

SellerAssessmentFeedback.defaultProps = {}

SellerAssessmentFeedback.propTypes = {
  feedback: PropTypes.object.isRequired
}

export default SellerAssessmentFeedback
