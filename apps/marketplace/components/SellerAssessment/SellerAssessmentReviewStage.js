import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import SellerAssessmentStages from './SellerAssessmentStages'
import styles from './SellerAssessmentReviewStage.scss'
import { getCriteriaName } from './SellerAssessmentEvidenceStage'

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
              <Link to={stage}>{SellerAssessmentStages.find(s => s.slug === stage).title || ''}</Link>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div>
        <AUheading level="1" size="xl">
          {props.meta.name} assessment
        </AUheading>
        <AUheading level="2" size="md">
          Maximum daily rate (including GST)
          <Link to="rate" className={styles.change}>
            Change
          </Link>
        </AUheading>
        <p>${props[props.model].maxDailyRate}</p>
        <AUheading level="2" size="lg">
          Evidence
          <Link to="evidence" className={styles.change}>
            Change
          </Link>
        </AUheading>
        <AUheading level="2" size="md">
          Client
        </AUheading>
        <p className={styles.reviewText}>{props[props.model].evidence.client}</p>
        <AUheading level="2" size="md">
          Background
        </AUheading>
        <p className={styles.reviewText}>{props[props.model].evidence.background}</p>
        {props[props.model].criteria.map(criteriaId => (
          <div key={criteriaId}>
            <span />
            <AUheading level="2" size="md">
              {getCriteriaName(criteriaId, props.meta.criteria)}
            </AUheading>
            <p className={styles.reviewText}>{props[props.model].evidence.criteriaResponses[criteriaId]}</p>
          </div>
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
