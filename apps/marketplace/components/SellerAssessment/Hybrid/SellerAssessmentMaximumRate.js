import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import AUtextInput from '@gov.au/text-inputs'


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

    {/* <label htmlFor="text-input" >Maximum daily rate (excluding mark-up and margin)</label>
      <p> The rate must be based on a person who demonstrates skills equivalnet to {' '} */}
        {/* Might need to add an external icon AND double check on the SFIA link*/}
        {/* <a
          href="https://www.sfia-online.org/en/framework/sfia-7/levels-of-responsibility/level-5"
          rel="noopener noreferrer"
          target="_blank"
        >
          SFIA Level 5
        </a>{' '}
        .</p>
    <AUtextInput id="text-input" width="sm" /> */} 

    <ErrorAlert
      model={props.model}
      messages={{
        greaterThanZero: 'The maximum daily rate must be greater than zero',
        lessThanLimit: `The maximum daily rate must be lower than $${maxDailyRateLimit}`,
        validWholeNumber: 'The maximum daily rate must be a whole number (e.g. 1200)'
      }}
    />
    <Textfield
      model={`${props.model}.maximumDailyRate`}
      prefix={`$`}
      postfix={'including GST'}
      label="Maximum daily rate (excluding mark-up and ma)"
      description={ `This rate must be based on a person who demonstrates skills equivalnet to  `}
      name="maximumMarkUp"
      id="maxDailyRate"
      htmlFor="maxDailyRate"
      defaultValue={props[props.model].maxDailyRate}
      // defaultValue={`hi`}
      />
    <Textfield
      model={`${props.model}.maximumMarkUp`}
      postfix={'%'}
      label="Maximum mark-up?"
      description={ `The percentage of on-costs to the day rate, including: your commission, workers compensation, payroll tax`}
      name="maximumMarkUp"
      id="maxDailyRate"
      htmlFor="maxDailyRate"
      defaultValue={props[props.model].maximumMarkUp}
      // defaultValue={`hi`}
      />
      <Textfield
      model={`${props.model}.totalMaximumRate`}
      label="Total maximum rate"
      description={ `The threshold for ${props.meta.domain.name} is $${props.meta.domain.priceMaximum}. If your total maximum rate is above this threshold, you will be asked to meet more criteria to prove you offer value for money.`}
      name="maxDailyRate"
      id="maxDailyRate"
      htmlFor="maxDailyRate"
      defaultValue={(props[props.model].maxDailyRate) * props[props.model].maximumMarkUp}
      disabled={true}
      
      />
{/* 
    <label htmlFor="text-input" >Total maximum rate</label>
    <p>The threshold for {props.meta.domain.name} is ${props.meta.domain.priceMaximum}. If your total maximum rate is above this threshold, you will be asked to meet more criteria to prove you offer value for money.</p>
    <AUtextInput disabled value='dfd' width="sm" /> */}
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