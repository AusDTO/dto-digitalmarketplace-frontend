/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import Textarea from 'shared/form/Textarea'
import Textfield from 'shared/form/Textfield'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import styles from './BuyerTrainingEvaluationCriteriaStage.scss'

export const noEmptyWeightings = formValues =>
  !formValues.includeWeightings || formValues.evaluationCriteria.every(val => val.weighting)

export const weightingsAddUpTo100 = formValues =>
  !formValues.includeWeightings ||
  !noEmptyWeightings(formValues) ||
  formValues.evaluationCriteria.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue.weighting, 10),
    0
  ) === 100

export const noZeroWeightings = formValues =>
  !formValues.includeWeightings || formValues.evaluationCriteria.every(val => parseInt(val.weighting, 10) > 0)

export const noEmptyCriteria = formValues => formValues.evaluationCriteria.every(val => val.criteria)

class BuyerTrainingEvaluationCriteriaStage extends Component {
  constructor(props) {
    super(props)
    this.handleIncludeWeightingsChange = this.handleIncludeWeightingsChange.bind(this)
    this.handleAddCriteriaClick = this.handleAddCriteriaClick.bind(this)
    this.removeCriteria = this.removeCriteria.bind(this)
  }

  getRemainingWeighting() {
    let remaining = 100
    this.props[this.props.model].evaluationCriteria.map(evaluation => {
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

  removeCriteria(index) {
    this.props.removeCriteriaByIndex(this.props[this.props.model].evaluationCriteria, index)
  }

  handleAddCriteriaClick(e) {
    e.preventDefault()
    this.props.addEmptyEvaluationCriteria(this.props[this.props.model].evaluationCriteria)
  }

  handleIncludeWeightingsChange(e) {
    const checked = e.target.checked
    if (!checked) {
      this.props.clearWeightingsFromCriteria(this.props[this.props.model].evaluationCriteria)
    }
  }

  render() {
    return (
      <Form
        model={this.props.model}
        validators={{
          '': { noEmptyWeightings, weightingsAddUpTo100, noZeroWeightings, noEmptyCriteria }
        }}
        onSubmit={this.props.onSubmit}
        onSubmitFailed={this.props.onSubmitFailed}
        validateOn="submit"
      >
        <AUheadings level="1" size="xl">
          Evaluation criteria
        </AUheadings>
        <ErrorAlert
          title="An error occurred"
          model={this.props.model}
          messages={{
            noEmptyWeightings: 'You must not have any empty weighting.',
            weightingsAddUpTo100: 'Weightings must add up to 100%.',
            noZeroWeightings: 'Weightings must be greater than 0.',
            noEmptyCriteria: 'You must not have any empty criteria.'
          }}
        />
        <p>
          <CheckboxDetailsField
            model={`${this.props.model}.includeWeightings`}
            id={`include_weightings`}
            name={`include_weightings`}
            onClick={this.handleIncludeWeightingsChange}
            label="Include weightings"
            detailsModel={this.props.model}
            validators={{}}
            messages={{}}
          />
        </p>
        {this.props[this.props.model].evaluationCriteria.map((evaluationCriteria, i) => {
          if (
            evaluationCriteria &&
            typeof evaluationCriteria.criteria !== 'undefined' &&
            typeof evaluationCriteria.weighting !== 'undefined'
          ) {
            return (
              <div className="row" key={`criteria_key_${i}`}>
                <div className={styles.criteriaContainer}>
                  <div className="col-xs-12 col-sm-7">
                    <Textarea
                      model={`${this.props.model}.evaluationCriteria[${i}].criteria`}
                      label="Criteria"
                      name={`criteria_${i}`}
                      id={`criteria_${i}`}
                      htmlFor={`criteria_${i}`}
                      defaultValue={evaluationCriteria.criteria}
                      controlProps={{ limit: 50 }}
                      messages={{
                        limitWords: 'Your criteria has exceeded the 50 word limit'
                      }}
                    />
                  </div>
                  {this.props[this.props.model].includeWeightings && (
                    <div className={styles.weightingContainer}>
                      <div className="col-xs-12 col-sm-3">
                        <Textfield
                          model={`${this.props.model}.evaluationCriteria[${i}].weighting`}
                          label="Weighting (%)"
                          name={`weighting_${i}`}
                          id={`weighting_${i}`}
                          htmlFor={`weighting_${i}`}
                          defaultValue={evaluationCriteria.weighting}
                          maxLength={3}
                          type="number"
                        />
                        {i === this.props[this.props.model].evaluationCriteria.length - 1 && (
                          <div className={styles.weightingRemaining}>{this.getRemainingWeighting()}% remaining</div>
                        )}
                      </div>
                    </div>
                  )}
                  {this.props[this.props.model].evaluationCriteria.length > 1 && (
                    <div className={`col-xs-12 col-sm-2 ${styles.removeCriteria}`}>
                      <a
                        href="#remove"
                        onClick={e => {
                          e.preventDefault()
                          this.removeCriteria(i)
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
          <a href="#add" onClick={this.handleAddCriteriaClick}>
            Add another criteria
          </a>
        </div>
        {this.props.formButtons}
      </Form>
    )
  }
}

BuyerTrainingEvaluationCriteriaStage.defaultProps = {
  clearWeightingsFromCriteria: () => {},
  addEmptyEvaluationCriteria: () => {},
  removeCriteriaByIndex: () => {},
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerTrainingEvaluationCriteriaStage.propTypes = {
  model: PropTypes.string.isRequired,
  clearWeightingsFromCriteria: PropTypes.func,
  addEmptyEvaluationCriteria: PropTypes.func,
  removeCriteriaByIndex: PropTypes.func,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func,
  formButtons: PropTypes.node.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  clearWeightingsFromCriteria: evaluationCriteria => {
    const newData = evaluationCriteria.map(evaluation => {
      const newEvaluation = { ...evaluation }
      newEvaluation.weighting = ''
      return newEvaluation
    })
    dispatch(actions.change(`${props.model}.evaluationCriteria`, newData))
  },
  addEmptyEvaluationCriteria: evaluationCriteria => {
    const newData = evaluationCriteria.slice(0)
    newData.push({
      criteria: '',
      weighting: ''
    })
    dispatch(actions.change(`${props.model}.evaluationCriteria`, newData))
  },
  removeCriteriaByIndex: (evaluationCriteria, index) => {
    const newData = evaluationCriteria.slice(0)
    newData.splice(index, 1)
    dispatch(actions.change(`${props.model}.evaluationCriteria`, newData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerTrainingEvaluationCriteriaStage)
