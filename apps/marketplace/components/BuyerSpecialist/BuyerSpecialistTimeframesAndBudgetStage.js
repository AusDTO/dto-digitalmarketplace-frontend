import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'
import DateControl from 'marketplace/components/BuyerBriefFlow/DateControl'

const startDateRequired = v => required(v.startDate)
const contractLengthRequired = v => required(v.contractLength)
const startDateIsValid = v => {
  if (!startDateRequired(v)) {
    return true
  }
  const startDate = v.startDate
  try {
    const date = parse(startDate)
    if (format(date, 'YYYY-MM-DD') !== startDate) {
      return false
    }
  } catch (e) {
    return false
  }
  return true
}
const startDateIsInFuture = v => {
  if (!startDateIsValid(v)) {
    return true
  }
  const startDate = v.startDate
  try {
    const date = parse(startDate)
    if (differenceInCalendarDays(date, new Date()) < 2) {
      return false
    }
  } catch (e) {
    return false
  }
  return true
}

export const done = v =>
  startDateRequired(v) && contractLengthRequired(v) && startDateIsValid(v) && startDateIsInFuture(v)

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
            contractLengthRequired,
            startDateIsValid,
            startDateIsInFuture
          }
        }}
      >
        <AUheadings level="1" size="xl">
          Timeframes
        </AUheadings>
        <ErrorAlert
          title="An error occurred"
          model={model}
          messages={{
            startDateRequired: 'Enter an estimated start date for the brief',
            contractLengthRequired: 'Enter a contract length for the brief',
            startDateIsValid: 'You must enter a valid estimated start date',
            startDateIsInFuture: 'You must enter an estimated start date in the future'
          }}
        />
        <DateControl
          id="startDate"
          model={`${model}.startDate`}
          onDateChange={this.handleDateChange}
          defaultValue={this.props[model].startDate}
          // className={styles.closingDateControl}
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
          showMaxLength
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
          showMaxLength
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyerSpecialistTimeframesAndBudgetStage)
