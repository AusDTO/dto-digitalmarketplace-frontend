import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import SellerAssessmentHybridStages from './SellerAssessmentHybridStages'
import styles from './SellerAssessmentReviewStage.scss'
import { getCriteriaName } from '../Hybrid/SellerAssessmentHybridEvidenceStage'

const SellerAssessmentReviewStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    {props.stagesTodo.length > 0 ? (
      <div>
        <AUheading level="1" size="xl">
          Review
        </AUheading>
        <p>Before you request assessment, you need to complete information in:</p>
        <ul>
          {props.stagesTodo.map(stage => (
            <li key={stage}>
              <Link to={stage}>{SellerAssessmentHybridStages.find(s => s.slug === stage).title || ''}</Link>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div>
        <AUheading level="1" size="xl">
          {props.meta.domain.name} assessment
        </AUheading>
        <AUheading level="2" size="lg">
          Maximum daily rate
          <Link to="rate" className={styles.change}>
            Change
          </Link>
        </AUheading>
        <p>${props[props.model].maxDailyRate} (including GST)</p>
        <div className={styles.spacer} />
        <AUheading level="2" size="lg">
          Evidence
          <Link to="evidence" className={styles.change}>
            Change
          </Link>
        </AUheading>
        {props[props.model].criteria.map(criteriaId => (
          <React.Fragment key={criteriaId}>
            <AUheading level="2" size="md">
              Criteria
            </AUheading>
            <p className={styles.reviewText}>{getCriteriaName(criteriaId, props.meta.domain.criteria)}</p>
            <AUheading level="2" size="md">
              Client
            </AUheading>
            <p className={styles.reviewText}>{props[props.model].evidence[criteriaId].client}</p>
            <AUheading level="2" size="md">
              Referee&apos;s name and number
            </AUheading>
            <p className={styles.reviewText}>
              {props[props.model].evidence[criteriaId].refereeName}:{' '}
              {props[props.model].evidence[criteriaId].refereeNumber}
            </p>
            <AUheading level="2" size="md">
              Project date
            </AUheading>
            <p className={styles.reviewText}>
              {props[props.model].evidence[criteriaId].startDate} - {props[props.model].evidence[criteriaId].endDate}
            </p>
            <AUheading level="2" size="md">
              Background
            </AUheading>
            <p className={styles.reviewText}>{props[props.model].evidence[criteriaId].background}</p>
            <AUheading level="2" size="md">
              Evidence of meeting the criteria
            </AUheading>
            <p className={styles.reviewText}>{props[props.model].evidence[criteriaId].response}</p>
            {props[props.model].criteria.indexOf(criteriaId) !== props[props.model].criteria.length - 1 && (
              <div className={styles.spacer} />
            )}
          </React.Fragment>
        ))}
        {props.formButtons}
      </div>
    )}
  </Form>
)

SellerAssessmentReviewStage.defaultProps = {
  onSubmit: () => {},
  stagesTodo: []
}

SellerAssessmentReviewStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  stagesTodo: PropTypes.array,
  meta: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(SellerAssessmentReviewStage)
