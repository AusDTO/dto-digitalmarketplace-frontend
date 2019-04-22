import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'
import DateControl from 'marketplace/components/BuyerBriefFlow/DateControl'

export const done = v =>
  startDateRequired(v) &&
  contractLengthRequired(v)

const startDateRequired = v => required(v.startDate)
const contractLengthRequired = v => required(v.contractLength)

class BuyerSpecialistTimeframesAndBudgetStage extends Component {
  constructor(props) {
    super(props)

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange(date) {
    this.props.setDate(`${date.year}-${date.month}-${date.day}`)
  }

  render() {
    const props = this.props
    return (
      <Form
        model={props.model}
        onSubmit={props.onSubmit}
        onSubmitFailed={props.onSubmitFailed}
        validateOn="submit"
        validators={{
          '': {
            startDateRequired,
            contractLengthRequired
          }
        }}
      >
        <AUheadings level="1" size="xl">
          Timeframes
        </AUheadings>
        <ErrorAlert
          title="An error occurred"
          model={props.model}
          messages={{
            startDateRequired: 'Enter an estimated start date for the brief',
            contractLengthRequired: 'Enter a contract length for the brief'
          }}
        />
        <DateControl
          id="startDate"
          model={`${props.model}.startDate`}
          onDateChange={this.handleDateChange}
          defaultValue={props[props.model].startDate}
          // className={styles.closingDateControl}
          label="Estimated start date"
          validators={{
            required
          }}
        />
        <Textfield
          model={`${props.model}.contractLength`}
          label="Contract length"
          name="contractLength"
          id="contractLength"
          htmlFor="contractLength"
          defaultValue={props[props.model].contractLength}
          maxLength={100}
          validators={{
            required
          }}
        />
        <Textfield
          model={`${props.model}.contractExtensions`}
          label="Contract extensions (optional)"
          name="contractExtensions"
          id="contractExtensions"
          htmlFor="contractExtensions"
          defaultValue={props[props.model].contractExtensions}
          maxLength={100}
        />
        {props.formButtons}
      </Form>
    )
  }
}

BuyerSpecialistTimeframesAndBudgetStage.defaultProps = {
  onSubmit: () => { },
  onSubmitFailed: () => { }
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
