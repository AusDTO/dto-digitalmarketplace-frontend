import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'
import AUheadings from '@gov.au/headings/lib/js/react.js'

const SellerAssessmentRateStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        requiredRate: formValues => required(formValues.maxDailyRate)
      }
    }}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
  >
    <AUheadings level="1" size="xl">
      Maximum daily rate
    </AUheadings>
    <ErrorAlert
      title="An error occurred"
      model={props.model}
      messages={{
        requiredRate: 'You must add a maximum daily rate'
      }}
    />
    <Textfield
      model={`${props.model}.maxDailyRate`}
      label="What is your maximum daily rate (including GST)"
      description={`The upper limit for ${props.meta.name} is $${props.meta.priceMaximum}`}
      name="maxDailyRate"
      id="maxDailyRate"
      htmlFor="maxDailyRate"
      type="number"
      defaultValue={props[props.model].maxDailyRate}
      maxLength={100}
      showMaxLength
      validators={{
        required
      }}
    />
    {props.formButtons}
  </Form>
)

SellerAssessmentRateStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

SellerAssessmentRateStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(SellerAssessmentRateStage)
