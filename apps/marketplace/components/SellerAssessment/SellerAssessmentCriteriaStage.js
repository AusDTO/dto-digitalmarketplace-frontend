import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import formProps from 'shared/form/formPropsSelector'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import styles from './SellerAssessmentCriteriaStage.scss'

export const getCriteriaNeeded = (criteriaNeeded, priceMaximum, maxDailyRate) => {
  let adjustedCriteriaNeeded = parseInt(criteriaNeeded, 10)
  if (parseInt(maxDailyRate, 10) > parseInt(priceMaximum, 10)) {
    adjustedCriteriaNeeded += 1
  }
  return adjustedCriteriaNeeded
}

class SellerAssessmentCriteriaStage extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    if (!e.target.checked) {
      // remove the deselected criteria from the responses model
      const criteriaId = e.target.value
      if (
        this.props[this.props.model] &&
        this.props[this.props.model].evidence &&
        this.props[this.props.model].evidence.criteriaResponses[criteriaId]
      ) {
        const criteriaResponses = { ...this.props[this.props.model].evidence.criteriaResponses }
        delete criteriaResponses[criteriaId]
        this.props.updateCriteriaResponses(criteriaResponses)
      }
    }
  }

  render() {
    return (
      <Form
        model={this.props.model}
        validators={{
          '': {
            requiredMinimal: formValues =>
              formValues.criteria &&
              formValues.criteria.length >=
                getCriteriaNeeded(
                  this.props.meta.criteriaNeeded,
                  this.props.meta.priceMaximum,
                  this.props[this.props.model].maxDailyRate
                )
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
            requiredMinimal: `You must select at least ${getCriteriaNeeded(
              this.props.meta.criteriaNeeded,
              this.props.meta.priceMaximum,
              this.props[this.props.model].maxDailyRate
            )} criteria`
          }}
        />
        <p>
          <strong>
            Select the criteria you will provide evidence for ({getCriteriaNeeded(
              this.props.meta.criteriaNeeded,
              this.props.meta.priceMaximum,
              this.props[this.props.model].maxDailyRate
            )}{' '}
            minimum required)
          </strong>
        </p>
        <div className={styles.criteria}>
          {this.props.meta.criteria.map(criteria => (
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
  updateCriteriaResponses: data => dispatch(actions.change(`${props.model}.evidence.criteriaResponses`, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerAssessmentCriteriaStage)
