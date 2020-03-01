import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import { required, dateIs2DaysInFuture, validDate, dateIsInPast } from 'marketplace/components/validators'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import DateControl from 'marketplace/components/BuyerBriefFlow/DateControl'

const contractLengthRequired = v => required(v.contractLength)
const startDateRequired = v => required(v.startDate)
const startDateIsValid = v => validDate(v.startDate, false)
const startDateIsInPast = v => !startDateRequired(v)  || validDate(v.startDate, true)
const startDateIs2DaysInFuture = v => !startDateRequired(v) || !validDate(v.startDate, false) || !validDate(v.startDate, true) || dateIs2DaysInFuture(v.startDate)


export const done = v =>
  startDateRequired(v) && startDateIsValid(v) && startDateIs2DaysInFuture(v) && contractLengthRequired(v)

class BuyerSpecialistTimeframesAndBudgetStage extends Component {
  constructor(props) {
    super(props)

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange(date) {
    this.props.setDate(`${date.year}-${date.month}-${date.day}`)
  }

  render() {
    const { formButtons, model, onSubmit, onSubmitFailed } = this.props
    return (
      <Form
        model={model}
        onSubmit={onSubmit}
        onSubmitFailed={onSubmitFailed}
        validateOn="submit"
        validators={{
          '': {
            startDateRequired,
            startDateIsValid,
            startDateIs2DaysInFuture,
            contractLengthRequired,
            startDateIsInPast
          }
        }}
      >
        <AUheadings level="1" size="xl">
          Timeframes
        </AUheadings>
        <ErrorAlert
          model={model}
          messages={{
            startDateRequired: 'Enter an estimated start date for the opportunity',
            startDateIsValid: 'You must enter a valid start date',
            startDateIs2DaysInFuture: 'You must enter an estimated start date at least 2 days from now',
            contractLengthRequired: 'Enter a contract length for the opportunity',
            startDateIsInPast: 'You must enter a start date that is in the future'
          }}
        />
        <DateControl
          id="startDate"
          model={`${model}.startDate`}
          onDateChange={this.handleDateChange}
          defaultValue={this.props[model].startDate}
          label="Estimated start date"
          validators={{
            required
          }}
        />
        <Textfield
          model={`${model}.contractLength`}
          label="Contract length"
          name="contractLength"
          id="contractLength"
          htmlFor="contractLength"
          defaultValue={this.props[model].contractLength}
          maxLength={100}
          validators={{
            required
          }}
        />
        <Textfield
          model={`${model}.contractExtensions`}
          label="Contract extensions (optional)"
          name="contractExtensions"
          id="contractExtensions"
          htmlFor="contractExtensions"
          defaultValue={this.props[model].contractExtensions}
          maxLength={100}
        />
        {formButtons}
      </Form>
    )
  }
}

BuyerSpecialistTimeframesAndBudgetStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerSpecialistTimeframesAndBudgetStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  setDate: date => dispatch(actions.change(`${props.model}.startDate`, date))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerSpecialistTimeframesAndBudgetStage)