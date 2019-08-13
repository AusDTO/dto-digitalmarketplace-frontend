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

const BuyerATMTimeframesAndBudgetStage = props => (
  <Form
    model={props.model}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
    validators={{
      '': {
        startDateRequired: formValues => required(formValues.startDate)
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
    <Textarea
      model={`${props.model}.timeframeConstraints`}
      label="Key dates or project milestones (optional)"
      name="timeframeConstraints"
      id="timeframeConstraints"
      htmlFor="timeframeConstraints"
      defaultValue={props[props.model].timeframeConstraints}
      controlProps={{ limit: 150 }}
    />
    {props.formButtons}
  </Form>
)

BuyerATMTimeframesAndBudgetStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerATMTimeframesAndBudgetStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerATMTimeframesAndBudgetStage)
