import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUdirectionLink from '@gov.au/direction-links/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import Tick from 'marketplace/components/Icons/Tick/Tick'
import Circle from 'marketplace/components/Icons/Circle/Circle'
import styles from './SellerAssessmentFeedback.scss'

const renderCriteriaFeedback = (criteriaId, criteria) => {
  let output = <div />
  if (
    criteria[criteriaId] &&
    criteria[criteriaId].has_feedback &&
    criteria[criteriaId].assessment &&
    criteria[criteriaId].assessment.reason
  ) {
    output = (
      <div className={styles.criteriaReview}>
        <p>
          <strong>Feedback from the assessment team:</strong>
          <br />
          {criteria[criteriaId].assessment.reason}
          <br />
          {criteria[criteriaId].assessment.feedback && <span>{criteria[criteriaId].assessment.feedback}</span>}
        </p>
      </div>
    )
  }
  return output
}

const SellerAssessmentFeedback = props => (
  <div>
    <AUdirectionLink link={`${rootPath}/seller-dashboard/categories`} text="back to dashboard" direction="left" />
    <AUheading level="1" size="xl">
      The assessment was unsuccessful.
    </AUheading>
    <AUheading level="2" size="lg">
      How the decision was reached
    </AUheading>
    {Object.keys(props.feedback.criteria).length > 0 && (
      <React.Fragment>
        <ul className={styles.feedbackList}>
          {Object.keys(props.feedback.criteria).map(criteriaId => (
            <li key={criteriaId}>
              {!props.feedback.criteria[criteriaId].has_feedback && <Tick colour="#36865f" className={styles.icon} />}
              {props.feedback.criteria[criteriaId].has_feedback && <Circle colour="#626262" className={styles.icon} />}
              {props.feedback.criteria[criteriaId].name}
              {renderCriteriaFeedback(criteriaId, props.feedback.criteria)}
            </li>
          ))}
          {!props.feedback.vfm && (
            <li>
              <Circle colour="#626262" className={styles.icon} /> The submitted rate was not considered value for money.
            </li>
          )}
        </ul>
        <AUheading level="2" size="lg">
          Next steps
        </AUheading>
        <p>
          You can incorporate the assessment team&apos;s feedback and{' '}
          <a href={`${rootPath}/seller-assessment/create/${props.feedback.domainId}`}>resubmit your request</a>.
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
