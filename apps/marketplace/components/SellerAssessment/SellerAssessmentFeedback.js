import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUdirectionLink from '@gov.au/direction-links/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import Tick from 'marketplace/components/Icons/Tick/Tick'
import Cross from 'marketplace/components/Icons/Cross/Cross'
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
          {criteria[criteriaId].assessment.reason}.
          <br />
          {criteria[criteriaId].assessment.feedback && <span>{criteria[criteriaId].assessment.feedback}</span>}
        </p>
      </div>
    )
  }
  return output
}

const allCriteriaPassed = criteria => Object.keys(criteria).every(id => !criteria[id].has_feedback)

const SellerAssessmentFeedback = props => (
  <div>
    <AUdirectionLink link={`${rootPath}/seller-dashboard`} text="back to dashboard" direction="left" />
    <AUheading level="1" size="xl">
      The assessment was unsuccessful.
    </AUheading>
    <AUheading level="2" size="lg">
      How the decision was reached
    </AUheading>
    {Object.keys(props.feedback.criteria).length > 0 && (
      <React.Fragment>
        <ul className={styles.feedbackList}>
          {props.feedback.vfm === false ? (
            <li>
              <Cross colour="#FF0000" className={styles.icon} />The submitted rate was not considered value for money.
            </li>
          ) : (
            <React.Fragment>
              {Object.keys(props.feedback.criteria).map(criteriaId => (
                <li key={criteriaId}>
                  {!props.feedback.criteria[criteriaId].has_feedback && (
                    <span>
                      <Tick colour="#17788D" className={styles.icon} />Evidence demonstrates &quot;{
                        props.feedback.criteria[criteriaId].name
                      }&quot;
                    </span>
                  )}
                </li>
              ))}
              {Object.keys(props.feedback.criteria).map(criteriaId => (
                <li key={criteriaId}>
                  {props.feedback.criteria[criteriaId].has_feedback && (
                    <React.Fragment>
                      <span>
                        <Cross colour="#FF0000" className={styles.icon} />Evidence does not demonstrate &quot;
                        {props.feedback.criteria[criteriaId].name}&quot;
                      </span>
                      {renderCriteriaFeedback(criteriaId, props.feedback.criteria)}
                    </React.Fragment>
                  )}
                </li>
              ))}
            </React.Fragment>
          )}
        </ul>
        <AUheading level="2" size="lg">
          Next steps
        </AUheading>
        {props.feedback.vfm === false &&
          !props.feedback.currentEvidenceId && (
            <p>
              You will need to{' '}
              <a href={`${rootPath}/seller-assessment/create/${props.feedback.domainId}`}>reduce your daily rate</a> so
              it is no higher than $XXX.
            </p>
          )}
        {props.feedback.vfm === false &&
          props.feedback.currentEvidenceId && (
            <p>
              You will need to{' '}
              <a href={`${rootPath}/seller-assessment/${props.feedback.currentEvidenceId}/introduction`}>
                reduce your daily rate
              </a>{' '}
              so it is no higher than $XXX.
            </p>
          )}
        {!allCriteriaPassed(props.feedback.criteria) &&
          props.feedback.vfm !== false &&
          !props.feedback.currentEvidenceId && (
            <p>
              You can incorporate the assessment team&apos;s feedback and{' '}
              <a href={`${rootPath}/seller-assessment/create/${props.feedback.domainId}`}>resubmit your request</a>.
            </p>
          )}
        {!allCriteriaPassed(props.feedback.criteria) &&
          props.feedback.vfm !== false &&
          props.feedback.currentEvidenceId && (
            <p>
              You can incorporate the assessment team&apos;s feedback and{' '}
              <a href={`${rootPath}/seller-assessment/${props.feedback.currentEvidenceId}/introduction`}>
                continue editing your request
              </a>.
            </p>
          )}
      </React.Fragment>
    )}
  </div>
)

SellerAssessmentFeedback.defaultProps = {}

SellerAssessmentFeedback.propTypes = {
  feedback: PropTypes.object.isRequired
}

export default SellerAssessmentFeedback
