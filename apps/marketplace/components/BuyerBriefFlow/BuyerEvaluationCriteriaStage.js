/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import Textarea from 'shared/form/Textarea'
import Textfield from 'shared/form/Textfield'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import AUheading from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import styles from './BuyerEvaluationCriteriaStage.scss'

const noEmptyWeightingsEssential = v =>
  !v.includeWeightingsEssential || v.essentialRequirements.every(val => val.weighting)

const noDuplicateEssential = v =>
  new Set(v.essentialRequirements.map(val => val.criteria)).size ===
  v.essentialRequirements.map(val => val.criteria).length

const noDuplicateNiceToHave = v =>
  new Set(v.niceToHaveRequirements.map(val => val.criteria)).size ===
  v.niceToHaveRequirements.map(val => val.criteria).length

export const weightingsAddUpTo100Essential = v =>
  !v.includeWeightingsEssential ||
  !noEmptyWeightingsEssential(v) ||
  v.essentialRequirements.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue.weighting, 10),
    0
  ) === 100

const noZeroWeightingsEssential = v =>
  !v.includeWeightingsEssential ||
  v.essentialRequirements.every(val => val.weighting === '' || parseInt(val.weighting, 10) > 0)

const noEmptyCriteriaEssential = v => v.essentialRequirements.every(val => val.criteria)

const noEmptyWeightingsNiceToHave = v =>
  !v.includeWeightingsNiceToHave || v.niceToHaveRequirements.every(val => (val.criteria ? val.weighting : true))

const noEmptyCriteriaNiceToHave = v => v.niceToHaveRequirements.every(val => (val.weighting ? val.criteria : true))

const weightingsAddUpTo100NiceToHave = v =>
  !v.includeWeightingsNiceToHave ||
  !noEmptyWeightingsNiceToHave(v) ||
  v.niceToHaveRequirements.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue.weighting, 10),
    0
  ) === 100

const noZeroWeightingsNiceToHave = v =>
  noEmptyCriteriaNiceToHave(v) ||
  !v.includeWeightingsNiceToHave ||
  v.niceToHaveRequirements.every(val => parseInt(val.weighting, 10) > 0)

export const done = v =>
  noEmptyWeightingsEssential(v) &&
  weightingsAddUpTo100Essential(v) &&
  noZeroWeightingsEssential(v) &&
  noEmptyCriteriaEssential(v) &&
  noEmptyWeightingsNiceToHave(v) &&
  weightingsAddUpTo100NiceToHave(v) &&
  noZeroWeightingsNiceToHave(v) &&
  noEmptyCriteriaNiceToHave(v) &&
  noDuplicateEssential(v) &&
  noDuplicateNiceToHave(v)

class BuyerEvaluationCriteriaStage extends Component {
  constructor(props) {
    super(props)
    this.handleIncludeWeightingsEssentialChange = this.handleIncludeWeightingsEssentialChange.bind(this)
    this.handleIncludeWeightingsNiceToHaveChange = this.handleIncludeWeightingsNiceToHaveChange.bind(this)
    this.handleAddEssentialCriteriaClick = this.handleAddEssentialCriteriaClick.bind(this)
    this.handleAddNiceToHaveCriteriaClick = this.handleAddNiceToHaveCriteriaClick.bind(this)
    this.removeCriteria = this.removeCriteria.bind(this)
  }

  static getRemainingWeighting(criteria) {
    let remaining = 100
    criteria.map(evaluation => {
      if (evaluation.weighting && parseInt(evaluation.weighting, 10) > 0) {
        remaining -= parseInt(evaluation.weighting, 10)
      }
      return true
    })
    if (remaining > 100) {
      remaining = 100
    }
    return remaining
  }

  removeCriteria(index, criteria, property) {
    this.props.removeCriteriaByIndex(criteria, property, index)
  }

  handleAddEssentialCriteriaClick(e) {
    e.preventDefault()
    this.props.addEmptyEvalutationCriteria(this.props[this.props.model].essentialRequirements, 'essentialRequirements')
  }

  handleAddNiceToHaveCriteriaClick(e) {
    e.preventDefault()
    this.props.addEmptyEvalutationCriteria(
      this.props[this.props.model].niceToHaveRequirements,
      'niceToHaveRequirements'
    )
  }

  handleIncludeWeightingsEssentialChange(e) {
    const checked = e.target.checked
    if (!checked) {
      this.props.clearWeightingsFromEssentialCriteria(this.props[this.props.model].essentialRequirements)
    }
  }

  handleIncludeWeightingsNiceToHaveChange(e) {
    const checked = e.target.checked
    if (!checked) {
      this.props.clearWeightingsFromNiceToHaveCriteria(this.props[this.props.model].niceToHaveRequirements)
    }
  }

  render() {
    return (
      <Form
        model={this.props.model}
        validators={{
          '': {
            noEmptyWeightingsEssential,
            weightingsAddUpTo100Essential,
            noZeroWeightingsEssential,
            noEmptyCriteriaEssential,
            noEmptyWeightingsNiceToHave,
            weightingsAddUpTo100NiceToHave,
            noZeroWeightingsNiceToHave,
            noEmptyCriteriaNiceToHave,
            noDuplicateEssential,
            noDuplicateNiceToHave
          }
        }}
        onSubmit={this.props.onSubmit}
        onSubmitFailed={this.props.onSubmitFailed}
        validateOn="submit"
      >
        <AUheading level="1" size="xl">
          Evaluation criteria
        </AUheading>
        <ErrorAlert
          model={this.props.model}
          messages={{
            noEmptyWeightingsEssential: 'You cannot have blank essential weightings.',
            weightingsAddUpTo100Essential: 'Essential weightings must add up to 100%.',
            noZeroWeightingsEssential: 'Essential weightings must be greater than 0.',
            noEmptyCriteriaEssential: 'You cannot have blank essential criteria.',
            noEmptyWeightingsNiceToHave: 'You cannot leave any weightings blank.',
            weightingsAddUpTo100NiceToHave: 'Desirable weightings must add up to 100%.',
            noZeroWeightingsNiceToHave: 'Desirable must be greater than 0.',
            noEmptyCriteriaNiceToHave: 'You cannot have blank desirable criteria.',
            noDuplicateEssential: 'All essential criteria must be unique',
            noDuplicateNiceToHave: 'All desirable criteria must be unique'
          }}
        />
        <AUheading level="2" size="lg">
          Essential criteria
        </AUheading>
        <p>
          <CheckboxDetailsField
            model={`${this.props.model}.includeWeightingsEssential`}
            id={`includeWeightingsEssential`}
            name={`includeWeightingsEssential`}
            onClick={this.handleIncludeWeightingsEssentialChange}
            label="Include weightings"
            detailsModel={this.props.model}
            validators={{}}
            messages={{}}
          />
        </p>
        {this.props[this.props.model].essentialRequirements.map((essentialRequirements, i) => {
          if (
            essentialRequirements &&
            typeof essentialRequirements.criteria !== 'undefined' &&
            typeof essentialRequirements.weighting !== 'undefined'
          ) {
            return (
              <div className="row" key={`criteria_key_${i}`}>
                <div className={styles.criteriaContainer}>
                  <div className="col-xs-12 col-sm-7">
                    <Textarea
                      model={`${this.props.model}.essentialRequirements[${i}].criteria`}
                      label="Criteria"
                      name={`essential_criteria_${i}`}
                      id={`essential_criteria_${i}`}
                      htmlFor={`essential_criteria_${i}`}
                      defaultValue={essentialRequirements.criteria}
                      controlProps={{ limit: 50 }}
                      messages={{}}
                    />
                  </div>
                  {this.props[this.props.model].includeWeightingsEssential && (
                    <div className={styles.weightingContainer}>
                      <div className="col-xs-12 col-sm-3">
                        <Textfield
                          model={`${this.props.model}.essentialRequirements[${i}].weighting`}
                          label="Weighting (%)"
                          name={`essential_weighting_${i}`}
                          id={`essential_weighting_${i}`}
                          htmlFor={`essential_weighting_${i}`}
                          defaultValue={essentialRequirements.weighting}
                          type="number"
                          min={1}
                          max={100}
                        />
                        {i === this.props[this.props.model].essentialRequirements.length - 1 && (
                          <div className={styles.weightingRemaining}>
                            {BuyerEvaluationCriteriaStage.getRemainingWeighting(
                              this.props[this.props.model].essentialRequirements
                            )}
                            % remaining
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {this.props[this.props.model].essentialRequirements.length > 1 && (
                    <div className={`col-xs-12 col-sm-2 ${styles.removeCriteria}`}>
                      <a
                        href="#remove"
                        onClick={e => {
                          e.preventDefault()
                          this.removeCriteria(
                            i,
                            this.props[this.props.model].essentialRequirements,
                            'essentialRequirements'
                          )
                        }}
                      >
                        Remove
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )
          }
          return null
        })}
        <div className={styles.addCriteria}>
          <a href="#add" onClick={this.handleAddEssentialCriteriaClick}>
            Add another criteria
          </a>
        </div>
        <AUheading level="2" size="lg">
          Desirable criteria (optional)
        </AUheading>
        <p>
          <CheckboxDetailsField
            model={`${this.props.model}.includeWeightingsNiceToHave`}
            id={`includeWeightingsNiceToHave`}
            name={`includeWeightingsNiceToHave`}
            onClick={this.handleIncludeWeightingsNiceToHaveChange}
            label="Include weightings"
            detailsModel={this.props.model}
            validators={{}}
            messages={{}}
          />
        </p>
        {this.props[this.props.model].niceToHaveRequirements.map((niceToHaveRequirements, i) => {
          if (
            niceToHaveRequirements &&
            typeof niceToHaveRequirements.criteria !== 'undefined' &&
            typeof niceToHaveRequirements.weighting !== 'undefined'
          ) {
            return (
              <div className="row" key={`criteria_key_${i}`}>
                <div className={styles.criteriaContainer}>
                  <div className="col-xs-12 col-sm-7">
                    <Textarea
                      model={`${this.props.model}.niceToHaveRequirements[${i}].criteria`}
                      label="Criteria"
                      name={`nice_to_have_criteria_${i}`}
                      id={`nice_to_have_criteria_${i}`}
                      htmlFor={`nice_to_have_criteria_${i}`}
                      defaultValue={niceToHaveRequirements.criteria}
                      controlProps={{ limit: 50 }}
                      messages={{}}
                    />
                  </div>
                  {this.props[this.props.model].includeWeightingsNiceToHave && (
                    <div className={styles.weightingContainer}>
                      <div className="col-xs-12 col-sm-3">
                        <Textfield
                          model={`${this.props.model}.niceToHaveRequirements[${i}].weighting`}
                          label="Weighting (%)"
                          name={`nice_to_have_weighting_${i}`}
                          id={`nice_to_have_weighting_${i}`}
                          htmlFor={`nice_to_have_weighting_${i}`}
                          defaultValue={niceToHaveRequirements.weighting}
                          type="number"
                          min={1}
                          max={100}
                        />
                        {i === this.props[this.props.model].niceToHaveRequirements.length - 1 && (
                          <div className={styles.weightingRemaining}>
                            {BuyerEvaluationCriteriaStage.getRemainingWeighting(
                              this.props[this.props.model].niceToHaveRequirements
                            )}
                            % remaining
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {this.props[this.props.model].niceToHaveRequirements.length > 1 && (
                    <div className={`col-xs-12 col-sm-2 ${styles.removeCriteria}`}>
                      <a
                        href="#remove"
                        onClick={e => {
                          e.preventDefault()
                          this.removeCriteria(
                            i,
                            this.props[this.props.model].niceToHaveRequirements,
                            'niceToHaveRequirements'
                          )
                        }}
                      >
                        Remove
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )
          }
          return null
        })}
        <div className={styles.addCriteria}>
          <a href="#add" onClick={this.handleAddNiceToHaveCriteriaClick}>
            Add another criteria
          </a>
        </div>
        {this.props.formButtons}
      </Form>
    )
  }
}

BuyerEvaluationCriteriaStage.defaultProps = {
  clearWeightingsFromEssentialCriteria: () => {},
  clearWeightingsFromNiceToHaveCriteria: () => {},
  addEmptyEvalutationCriteria: () => {},
  removeCriteriaByIndex: () => {},
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerEvaluationCriteriaStage.propTypes = {
  model: PropTypes.string.isRequired,
  clearWeightingsFromEssentialCriteria: PropTypes.func,
  clearWeightingsFromNiceToHaveCriteria: PropTypes.func,
  addEmptyEvalutationCriteria: PropTypes.func,
  removeCriteriaByIndex: PropTypes.func,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func,
  formButtons: PropTypes.node.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  clearWeightingsFromEssentialCriteria: essentialRequirements => {
    const newData = essentialRequirements.map(evaluation => {
      const newEvaluation = { ...evaluation }
      newEvaluation.weighting = ''
      return newEvaluation
    })
    dispatch(actions.change(`${props.model}.essentialRequirements`, newData))
  },
  clearWeightingsFromNiceToHaveCriteria: niceToHaveRequirements => {
    const newData = niceToHaveRequirements.map(evaluation => {
      const newEvaluation = { ...evaluation }
      newEvaluation.weighting = ''
      return newEvaluation
    })
    dispatch(actions.change(`${props.model}.niceToHaveRequirements`, newData))
  },
  addEmptyEvalutationCriteria: (criteria, property) => {
    const newData = criteria.slice(0)
    newData.push({
      criteria: '',
      weighting: ''
    })
    dispatch(actions.change(`${props.model}.${property}`, newData))
  },
  removeCriteriaByIndex: (criteria, property, index) => {
    const newData = criteria.slice(0)
    newData.splice(index, 1)
    dispatch(actions.change(`${props.model}.${property}`, newData))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerEvaluationCriteriaStage)
