import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'

const startDateRequired = formValues => required(formValues.startDate)
const contractLengthRequired = formValues => required(formValues.contractLength)

export const done = v => startDateRequired(v) && contractLengthRequired(v)

const BuyerTrainingTimeframesAndBudgetStage = props => (
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
      Timeframes and budget
    </AUheadings>
    <ErrorAlert
      title="An error occurred"
      model={props.model}
      messages={{
        startDateRequired: 'You must add an estimated start date',
        contractLengthRequired: 'You must add a contract length'
      }}
    />
    <Textfield
      model={`${props.model}.startDate`}
      label="Estimated start date"
      name="start_date"
      id="start_date"
      htmlFor="start_date"
      defaultValue={props[props.model].startDate}
      maxLength={100}
      validators={{
        required
      }}
    />
    <Textfield
      model={`${props.model}.contractLength`}
      label="Length of contract"
      name="contract_length"
      id="contract_length"
      htmlFor="contract_length"
      defaultValue={props[props.model].contractLength}
      validators={{
        required
      }}
    />
    <Textfield
      model={`${props.model}.contractExtensions`}
      label="Contract extensions (optional)"
      name="contract_extensions"
      id="contract_extensions"
      htmlFor="contract_extensions"
      defaultValue={props[props.model].contractExtensions}
      validators={{}}
      messages={{}}
    />
    <Textarea
      model={`${props.model}.budgetRange`}
      label="Budget range (optional)"
      description="Please specify if your budget includes GST and if it covers travel and accommodation related expenses. Remember to negotiate discounts and seek better rates for longer-term contracts."
      name="budget_range"
      id="budget_range"
      htmlFor="budget_range"
      defaultValue={props[props.model].budgetRange}
      controlProps={{ limit: 150 }}
      validators={{}}
      messages={{
        limitWords: 'Your budget range has exceeded the 150 word limit'
      }}
    />
    {props.formButtons}
  </Form>
)

BuyerTrainingTimeframesAndBudgetStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerTrainingTimeframesAndBudgetStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerTrainingTimeframesAndBudgetStage)
