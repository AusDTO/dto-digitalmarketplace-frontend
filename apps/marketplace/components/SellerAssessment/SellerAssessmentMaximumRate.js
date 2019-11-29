import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

const maxDailyRateLimit = 99999

export const greaterThanZero = formValues => parseInt(formValues.maxDailyRate, 10) > 0

export const lessThanLimit = formValues => parseInt(formValues.maxDailyRate, 10) < maxDailyRateLimit

export const validWholeNumber = formValues => formValues.maxDailyRate && /^[0-9]+$/.test(formValues.maxDailyRate)

export const done = formValues =>
  formValues.maxDailyRate && greaterThanZero(formValues) && lessThanLimit(formValues) && validWholeNumber(formValues)

const SellerAssessmentRateStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        greaterThanZero,
        lessThanLimit,
        validWholeNumber
      }
    }}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
  >
    <AUheadings level="1" size="xl">
      Maximum rate
    </AUheadings>
    <ErrorAlert
      model={props.model}
      messages={{
        greaterThanZero: 'The maximum daily rate must be greater than zero',
        lessThanLimit: `The maximum daily rate must be lower than $${maxDailyRateLimit}`,
        validWholeNumber: 'The maximum daily rate must be a whole number (e.g. 1200)'
      }}
    />
    <Textfield
      model={`${props.model}.maxDailyRate`}
      prefix={'$'}
      label="Maximum daily rate (excluding mark-up)"
      // description={`The threshold for ${props.meta.domain.name} is $${props.meta.domain.priceMaximum}. If you nominate a price above this threshold, you will be asked to match more criteria to prove you offer value for money.`}
      description={ `This rate must be based on a person who demonstrates skills equivalent to`
        // <a href ="https://www.sfia-online.org/en/framework/sfia-7/busskills/level-5" 
        //   rel="noopener noreferrer" 
        //   target="_blank"> 
        //   SFIA level 5 </a> 
      }
      name="maxDailyRate"
      id="maxDailyRate"
      htmlFor="maxDailyRate"
      defaultValue={props[props.model].maxDailyRate}
    />
    <ErrorAlert
      model={props.model}
      messages={{
        greaterThanZero: 'The maximum daily rate must be greater than zero',
        lessThanLimit: `The maximum daily rate must be lower than $${maxDailyRateLimit}`,
        validWholeNumber: 'The maximum daily rate must be a whole number (e.g. 1200)'
      }}
    />
    <Textfield
      model={`${props.model}.maxDailyRate`}
      prefix={'$'}
      label="Maximum daily rate (excluding mark-up)"
      description={ `The percentage of on-costs to thge day rate, including: your commission, workers compensation, payroll tax`
      }
      name="maxDailyRate"
      id="maxDailyRate"
      htmlFor="maxDailyRate"
      defaultValue={props[props.model].maxDailyRate}
    />
    {parseInt(props[props.model].maxDailyRate, 10) > parseInt(props.meta.domain.priceMaximum, 10) && (
      <AUpageAlert as="info">
        <p>
          This price is above the threshold for {props.meta.domain.name} assessments. You will be asked to match more
          criteria in this assessment.
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
