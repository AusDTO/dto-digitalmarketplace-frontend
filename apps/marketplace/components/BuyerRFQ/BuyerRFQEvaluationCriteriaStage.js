/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'
import StatefulError from 'shared/form/StatefulError'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import { required } from 'marketplace/components/validators'
import styles from './BuyerRFQEvaluationCriteriaStage.scss'

export const weightingsAddUpTo100 = evaluationCriteria =>
  !evaluationCriteria.some(val => val.weighting) ||
  evaluationCriteria.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.weighting, 10), 0) ===
    100

class BuyerRFQEvaluationCriteriaStage extends Component {
  constructor(props) {
    super(props)

    const hasWeightings = props[props.model].evaluationCriteria.some(val => val.weighting)

    this.state = {
      showWeightings: hasWeightings
    }

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
    if (remaining < 0) {
      remaining = 0
    }
    if (remaining > 100) {
      remaining = 100
    }
    return remaining
  }

  removeCriteria(index) {
    this.props.removeCriteriaByIndex(this.props[this.props.model].evaluationCriteria, index)
  }

  handleIncludeWeightingsChange(e) {
    const checked = e.target.checked
    this.setState(curState => {
      const newState = { ...curState }
      const showWeightings = checked
      newState.showWeightings = showWeightings
      if (!showWeightings) {
        this.props.clearWeightingsFromCriteria(this.props[this.props.model].evaluationCriteria)
      }
      return newState
    })
  }

  handleAddCriteriaClick(e) {
    e.preventDefault()
    this.props.addEmptyEvalutationCriteria(this.props[this.props.model].evaluationCriteria)
  }

  render() {
    return (
      <div>
        <AUheadings level="1" size="xl">
          Evaluation criteria
        </AUheadings>
        <p>
          <AUcheckbox
            id="include_weightings"
            label="Include weightings"
            name="weightings"
            checked={this.state.showWeightings}
            onChange={this.handleIncludeWeightingsChange}
          />
        </p>
        <Form
          model={`${this.props.model}.evaluationCriteria`}
          component="div"
          validators={{
            '': { weightingsAddUpTo100 }
          }}
        >
          {this.props[this.props.model].evaluationCriteria.map((evaluationCriteria, i) => {
            if (
              evaluationCriteria &&
              typeof evaluationCriteria.criteria !== 'undefined' &&
              typeof evaluationCriteria.weighting !== 'undefined'
            ) {
              return (
                <div className="row" key={`criteria_key_${i}`}>
                  <div className={`col-lg-8 ${styles.criteriaActions}`}>
                    <Textfield
                      model={`${this.props.model}.evaluationCriteria[${i}].criteria`}
                      label="Criteria"
                      name={`criteria_${i}`}
                      id={`criteria_${i}`}
                      htmlFor={`criteria_${i}`}
                      defaultValue={evaluationCriteria.criteria}
                      maxLength={100}
                      validators={{
                        required
                      }}
                      messages={{
                        required: `Criteria can't be empty`
                      }}
                    />
                    {i === this.props[this.props.model].evaluationCriteria.length - 1 && (
                      <a href="#add" onClick={this.handleAddCriteriaClick}>
                        Add another criteria
                      </a>
                    )}
                    {this.props[this.props.model].evaluationCriteria.length > 1 && (
                      <a
                        href="#remove"
                        onClick={e => {
                          e.preventDefault()
                          this.removeCriteria(i)
                        }}
                      >
                        Remove this criteria
                      </a>
                    )}
                  </div>
                  {this.state.showWeightings && (
                    <div className="col-lg-4">
                      <div className={styles.weightingContainer}>
                        <Textfield
                          model={`${this.props.model}.evaluationCriteria[${i}].weighting`}
                          label="Weighting (%)"
                          name={`weighting_${i}`}
                          id={`weighting_${i}`}
                          htmlFor={`weighting_${i}`}
                          defaultValue={evaluationCriteria.weighting}
                          maxLength={3}
                          validators={{
                            withinRange: val => parseInt(val, 10) > 0 && parseInt(val, 10) <= 100
                          }}
                          messages={{
                            withinRange: 'A weighting must be more than 0% and not greater than 100%'
                          }}
                        />
                        <div className={styles.weightingRemaining}>{this.getRemainingWeighting()}% remaining</div>
                      </div>
                    </div>
                  )}
                </div>
              )
            }
            return null
          })}
          <StatefulError
            model={`${this.props.model}.evaluationCriteria`}
            messages={{
              weightingsAddUpTo100: 'The weightings must add up to exactly 100%.'
            }}
            id="evaluation_criteria_errors"
          />
        </Form>
      </div>
    )
  }
}

BuyerRFQEvaluationCriteriaStage.defaultProps = {
  clearWeightingsFromCriteria: () => {},
  addEmptyEvalutationCriteria: () => {},
  removeCriteriaByIndex: () => {}
}

BuyerRFQEvaluationCriteriaStage.propTypes = {
  model: PropTypes.string.isRequired,
  clearWeightingsFromCriteria: PropTypes.func,
  addEmptyEvalutationCriteria: PropTypes.func,
  removeCriteriaByIndex: PropTypes.func
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
  addEmptyEvalutationCriteria: evaluationCriteria => {
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRFQEvaluationCriteriaStage)
