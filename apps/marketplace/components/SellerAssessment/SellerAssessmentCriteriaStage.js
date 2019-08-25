import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import formProps from 'shared/form/formPropsSelector'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import { SellerAssessmentEvidenceReducer } from 'marketplace/reducers'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import styles from './SellerAssessmentCriteriaStage.scss'

const getCriteriaNeeded = (criteriaNeeded, priceMaximum, maxDailyRate) => {
  let adjustedCriteriaNeeded = parseInt(criteriaNeeded, 10)
  if (parseInt(maxDailyRate, 10) > parseInt(priceMaximum, 10)) {
    adjustedCriteriaNeeded += 1
  }
  return adjustedCriteriaNeeded
}

const getCriteriaAllowed = (criteriaNeeded, priceMaximum, maxDailyRate) =>
  getCriteriaNeeded(criteriaNeeded, priceMaximum, maxDailyRate) + 2

const minimumCriteriaMet = (v, d) =>
  d.criteriaNeeded &&
  v.criteria &&
  v.criteria.length &&
  v.criteria.length >= getCriteriaNeeded(d.criteriaNeeded, d.priceMaximum, v.maxDailyRate)

const maximumCriteriaAllowed = (v, d) =>
  !minimumCriteriaMet(v, d) ||
  (d.criteriaNeeded &&
    v.criteria &&
    v.criteria.length &&
    v.criteria.length <= getCriteriaAllowed(d.criteriaNeeded, d.priceMaximum, v.maxDailyRate))

export const done = (formValues, meta) =>
  minimumCriteriaMet(formValues, meta.domain) && maximumCriteriaAllowed(formValues, meta.domain)

class SellerAssessmentCriteriaStage extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    // add the selected criteria to the responses model if it doesn't yet exist
    if (e.target.checked) {
      const criteriaId = e.target.value
      if (
        this.props[this.props.model] &&
        this.props[this.props.model].evidence &&
        !this.props[this.props.model].evidence[criteriaId]
      ) {
        const criteriaResponses = { ...this.props[this.props.model].evidence }
        criteriaResponses[criteriaId] = { ...SellerAssessmentEvidenceReducer }
        this.props.updateCriteriaResponses(criteriaResponses)
      }
    }

    // remove the deselected criteria from the responses model
    if (!e.target.checked) {
      const criteriaId = e.target.value
      if (
        this.props[this.props.model] &&
        this.props[this.props.model].evidence &&
        this.props[this.props.model].evidence[criteriaId]
      ) {
        const criteriaResponses = { ...this.props[this.props.model].evidence }
        delete criteriaResponses[criteriaId]
        this.props.updateCriteriaResponses(criteriaResponses)
      }
    }
  }

  render() {
    const domain = this.props.meta.domain
    const criteriaNeeded = getCriteriaNeeded(
      domain.criteriaNeeded,
      domain.priceMaximum,
      this.props[this.props.model].maxDailyRate
    )
    const criteriaAllowed = getCriteriaAllowed(
      domain.criteriaNeeded,
      domain.priceMaximum,
      this.props[this.props.model].maxDailyRate
    )
    return (
      <Form
        model={this.props.model}
        validators={{
          '': {
            requiredMinimal: v => minimumCriteriaMet(v, domain),
            requiredMaximum: v => maximumCriteriaAllowed(v, domain)
          }
        }}
        onSubmit={this.props.onSubmit}
        onSubmitFailed={this.props.onSubmitFailed}
        validateOn="submit"
      >
        <AUheadings level="1" size="xl">
          Assessment criteria
        </AUheadings>
        <ErrorAlert
          title="An error occurred"
          model={this.props.model}
          messages={{
            requiredMinimal: `You must submit evidence for at least ${criteriaNeeded} criteria`,
            requiredMaximum: `You cannot submit evidence for more than ${criteriaAllowed} criteria`
          }}
        />
        <p>
          <strong>
            For this assessment, you must submit evidence between {criteriaNeeded} to {criteriaAllowed} criteria.
          </strong>
        </p>
        <div className={styles.criteria}>
          {domain.criteria.map(criteria => (
            <CheckboxDetailsField
              key={criteria.id}
              model={`${this.props.model}.criteria[]`}
              id={`criteria_${criteria.id}`}
              name={`criteria_${criteria.id}`}
              label={criteria.name}
              value={criteria.id}
              detailsModel={this.props.model}
              onClick={this.handleClick}
              validators={{}}
              messages={{}}
            />
          ))}
        </div>
        {this.props.formButtons}
      </Form>
    )
  }
}

SellerAssessmentCriteriaStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

SellerAssessmentCriteriaStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  updateCriteriaResponses: data => dispatch(actions.change(`${props.model}.evidence`, data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerAssessmentCriteriaStage)
