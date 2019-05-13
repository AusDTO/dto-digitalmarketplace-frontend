import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

const maxDailyRateLimit = 99999

export const greaterThanZero = formValues => parseInt(formValues.maxDailyRate, 10) > 0

export const lessThanLimit = formValues => parseInt(formValues.maxDailyRate, 10) < maxDailyRateLimit

const SellerAssessmentRateStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        greaterThanZero,
        lessThanLimit
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
        greaterThanZero: 'The maximum daily rate must be greater than zero',
        lessThanLimit: `The maximum daily rate must be lower than $${maxDailyRateLimit}`
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
    />
    {parseInt(props[props.model].maxDailyRate, 10) > parseInt(props.meta.priceMaximum, 10) && (
      <AUpageAlert as="info">
        <p>
          This price is above the upper limit for {props.meta.name} assessments. If you nominate a price above the upper
          limit, you will need to match more criteria in this assessment.
        </p>
      </AUpageAlert>
    )}
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
