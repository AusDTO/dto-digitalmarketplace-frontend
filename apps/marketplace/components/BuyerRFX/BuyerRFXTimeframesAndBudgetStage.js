import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from './ErrorAlert'

const BuyerRFXTimeframesAndBudgetStage = props => (
  <Form
    model={props.model}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
    validators={{
      '': {
        startDateRequired: formValues => required(formValues.startDate),
        contractLengthRequired: formValues => required(formValues.contractLength)
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
        startDateRequired: 'Enter an estimated start date for the brief',
        contractLengthRequired: 'Enter a contract length for the brief'
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
    <Textfield
      model={`${props.model}.keyDates`}
      label="Key dates or milestones (optional)"
      name="key_dates"
      id="key_dates"
      htmlFor="key_dates"
      defaultValue={props[props.model].keyDates}
      validators={{}}
      messages={{}}
    />
    <Textarea
      model={`${props.model}.budgetRange`}
      label="Budget range (optional)"
      description="For an accurate breakdown of costs in seller responses or proposals, provide as much budget information as you can. Please specify if this includes travel and accommodation."
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

BuyerRFXTimeframesAndBudgetStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerRFXTimeframesAndBudgetStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerRFXTimeframesAndBudgetStage)
