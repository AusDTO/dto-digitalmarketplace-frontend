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

const getMinimumMessage = (criteriaNeeded, essentialCriteria) => {
  if (essentialCriteria.length > 0) {
    return (
      <span>
        You must select at least {criteriaNeeded - essentialCriteria.length} <strong>&apos;Other criteria&apos;</strong>
      </span>
    )
  }

  return (
    <span>
      You must submit evidence for at least {criteriaNeeded} {criteriaNeeded === 1 ? 'criterion' : 'criteria'}
    </span>
  )
}

const getMaximumMessage = (criteriaAllowed, essentialCriteria) => {
  if (essentialCriteria.length > 0) {
    return (
      <span>
        You can only select a maximum of {criteriaAllowed - essentialCriteria.length}{' '}
        <strong>&apos;Other criteria&apos;</strong>
      </span>
    )
  }

  return <span>You cannot submit evidence for more than ${criteriaAllowed} criteria.</span>
}

const minimumCriteriaMet = (v, d) =>
  d.criteriaNeeded &&
  v.criteria &&
  v.criteria.length &&
  v.criteria.length >= getCriteriaNeeded(d.criteriaNeeded, d.priceMaximum, v.maxDailyRate)

const maximumCriteriaAllowed = (v, d) =>
  !minimumCriteriaMet(v, d) ||
  new Date(v.created_at) <= new Date(d.criteriaEnforcementCutoffDate) ||
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

    const essentialCriteria = domain.criteria.filter(criterion => criterion.essential)
    const otherCriteria = domain.criteria.filter(criterion => !criterion.essential)
    const otherCriteriaToRespondTo =
      criteriaNeeded - essentialCriteria.length > 0 ? criteriaNeeded - essentialCriteria.length : null

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
          model={this.props.model}
          messages={{
            requiredMinimal: getMinimumMessage(criteriaNeeded, essentialCriteria),
            requiredMaximum: getMaximumMessage(criteriaAllowed, essentialCriteria)
          }}
        />
        <p>
          {essentialCriteria.length > 0 ? (
            <React.Fragment>
              <span>For this assessment, you must submit evidence for:</span>
              <ul>
                <li>
                  all &apos;<strong>Essential criteria</strong>&apos;
                </li>
                {otherCriteriaToRespondTo && otherCriteriaToRespondTo > 0 && (
                  <li>
                    at least {otherCriteriaToRespondTo} &apos;<strong>Other criteria</strong>&apos;
                  </li>
                )}
              </ul>
            </React.Fragment>
          ) : (
            <strong>For this assessment, you must submit at least {criteriaNeeded} criteria.</strong>
          )}
        </p>
        {essentialCriteria.length > 0 && (
          <React.Fragment>
            <AUheadings level="2" size="lg">
              Essential criteria
            </AUheadings>
            <div className={styles.criteria}>
              {essentialCriteria.map(criteria => {
                let splitCriteria = []
                let mainCriteria = criteria.name
                let subCriteria = []

                if (criteria.id === 2101) {
                  splitCriteria = criteria.name.split(':', 2)

                  if (splitCriteria.length > 0) {
                    mainCriteria = `${splitCriteria[0]}:`
                    subCriteria = splitCriteria[1].split(';')
                  }
                }
                return (
                  <React.Fragment key={criteria.id}>
                    <p className={styles.essential}>{criteria.id === 2101 ? mainCriteria : criteria.name}</p>
                    {criteria.id === 2101 && (
                      <ul>
                        {subCriteria.map(subCriterion => (
                          <li>{subCriterion.trim()}</li>
                        ))}
                      </ul>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
            <AUheadings level="2" size="lg">
              Other criteria
            </AUheadings>
          </React.Fragment>
        )}
        <div className={styles.criteria}>
          {otherCriteria.map(criteria => (
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
