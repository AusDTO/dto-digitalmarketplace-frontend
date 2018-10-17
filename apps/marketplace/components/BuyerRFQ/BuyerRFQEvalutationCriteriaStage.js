import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import { required } from 'marketplace/components/validators'
import range from 'lodash/range'
import styles from './BuyerRFQEvalutationCriteriaStage.scss'

class BuyerRFQEvalutationCriteriaStage extends Component {
  constructor(props) {
    super(props)

    const criteriaCount = props[props.model].evaluationCriteria.length
    const hasWeightings = props[props.model].evaluationCriteria.some(val => val.weighting)

    this.state = {
      criteriaCount: criteriaCount > 0 ? criteriaCount : 1,
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
    this.setState(curState => {
      const newState = { ...curState }
      const newCount = newState.criteriaCount - 1
      newState.criteriaCount = newCount > 0 ? newCount : 1
      return newState
    })
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
    this.setState(curState => {
      const newState = { ...curState }
      newState.criteriaCount += 1
      return newState
    })
  }

  render() {
    return (
      <div>
        <AUheadings level="1" size="xl">
          Evaluation criteria
        </AUheadings>
        <p>
          <AUcheckbox
            label="Include weightings"
            name="weightings"
            checked={this.state.showWeightings}
            onChange={this.handleIncludeWeightingsChange}
          />
        </p>
        {range(this.state.criteriaCount).map(i => {
          if (
            this.props[this.props.model].evaluationCriteria[i] &&
            typeof this.props[this.props.model].evaluationCriteria[i].criteria !== 'undefined' &&
            typeof this.props[this.props.model].evaluationCriteria[i].weighting !== 'undefined'
          ) {
            return (
              <div className="row" key={i}>
                <div className={`col-xs-8 ${styles.criteriaActions}`}>
                  <Textfield
                    model={`${this.props.model}.evaluationCriteria[${i}].criteria`}
                    label="Criteria"
                    name={`criteria_${i}`}
                    id={`criteria_${i}`}
                    htmlFor={`criteria_${i}`}
                    defaultValue={this.props[this.props.model].evaluationCriteria[i].criteria}
                    maxLength={100}
                    validators={{
                      required
                    }}
                    messages={{
                      required: `Criteria can't be empty`
                    }}
                  />
                  {i === this.state.criteriaCount - 1 && (
                    <a href="#add" onClick={this.handleAddCriteriaClick}>
                      Add another criteria
                    </a>
                  )}
                  {i > 0 && (
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
                  <div className="col-xs-4">
                    <div className={styles.weightingContainer}>
                      <Textfield
                        model={`${this.props.model}.evaluationCriteria[${i}].weighting`}
                        label="Weighting (%)"
                        name={`weighting_${i}`}
                        id={`weighting_${i}`}
                        htmlFor={`weighting_${i}`}
                        defaultValue={this.props[this.props.model].evaluationCriteria[i].weighting}
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
      </div>
    )
  }
}

BuyerRFQEvalutationCriteriaStage.propTypes = {
  model: PropTypes.string.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRFQEvalutationCriteriaStage)
