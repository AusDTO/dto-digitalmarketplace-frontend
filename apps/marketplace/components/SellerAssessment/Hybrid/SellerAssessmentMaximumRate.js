import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import styles from '../Hybrid/SellerAssessmentMaximumRate.scss'
import style from '../../Brief/BriefSpecialistResponseForm2.scss'

const maxDailyRateLimit = 99999

export const greaterThanZero = formValues => parseInt(formValues.maxDailyRate, 10) > 0
export const greaterThanZeroMarkup = formValues => parseInt(formValues.markup, 10) > 0

export const lessThanLimit = formValues => parseInt(formValues.maxDailyRate, 10) < maxDailyRateLimit

export const validWholeNumber = formValues => formValues.maxDailyRate && /^[0-9]+$/.test(formValues.maxDailyRate)
export const validWholeNumberMarkup = formValues => formValues.markup && /^[0-9]+$/.test(formValues.markup)

const sellerRateChange = (maxDailyRate, markup) => {
  let totalMax = 0
  let fixMaxDailyRate = parseInt(maxDailyRate, 10)
  let fixMarkUp = parseInt(markup, 10)
  totalMax = fixMaxDailyRate * (fixMarkUp / 100) + fixMaxDailyRate
  return totalMax
}

export const done = formValues =>
  (formValues.maxDailyRate &&
    greaterThanZero(formValues) &&
    lessThanLimit(formValues) &&
    validWholeNumber(formValues) &&
    formValues.placingCandidates === 'consultants') ||
  ((formValues.placingCandidates === 'recruitment' || formValues.placingCandidates === 'hybrid') &&
    formValues.markup &&
    greaterThanZeroMarkup(formValues) &&
    validWholeNumberMarkup(formValues) &&
    formValues.totalMaximumRate)
  
  
const SellerAssessmentRateStage = props => (

  //   const SellerAssessmentRateStage: {
  //     ({  onRateChange2 }: 
  //       {
  //       onRateChange2: any;
  //     })
  // }
  <Form
    model={props.model}
    validators={{
      '': {
        greaterThanZero,
        lessThanLimit,
        validWholeNumber,
        greaterThanZeroMarkup,
        validWholeNumberMarkup
      }
    }}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
  >
    <AUheadings level="1" size="xl">
      Maximum rate
    </AUheadings>

    {/* If a seller has choosen recruiter/hybrid or has not completed the placingCandidate Stage they should see this page as the default */}
    {props[props.model].placingCandidates !== 'consultants' && (
      <div>
        <ErrorAlert
          model={props.model}
          messages={{
            greaterThanZero: 'The maximum daily rate must be greater than zero',
            lessThanLimit: `The maximum daily rate must be lower than $${maxDailyRateLimit}`,
            validWholeNumber: 'The maximum daily rate must be a whole number (e.g. 1200)',
            greaterThanZeroMarkup: 'The maximum mark-up must be greater than zero percent',
            validWholeNumberMarkup: 'The maximum mark-up must be a whole number (e.g. 15)'
          }}
        />

        <div className={styles.maxDailyRate} />
        <Textfield
          model={`${props.model}.maxDailyRate`}
          prefix={`$`}
          postfix={'including GST'}
          label="Maximum daily rate (excluding mark-up)"
          description={`This rate must be based on a person who demonstrates skills equivalnet to  `}
          name="maxDailyRate"
          id="maxDailyRate"
          htmlFor="maxDailyRate"
          defaultValue={props[props.model].maxDailyRate}
          onChange={data => props.onRateChange2('totalMaximumRate', data.target.value, props[props.model].markup)}
          // onChange={sellerRateChange(maxDailyRate, markup)}
        />
        <Textfield
          model={`${props.model}.markup`}
          postfix={'%'}
          label="Maximum mark-up"
          description={`The percentage of on-costs to the day rate, including: your commission, workers compensation, payroll tax`}
          name="markup"
          id="markup"
          htmlFor="markup"
          defaultValue={props[props.model].markup}
          onChange={data => props.onRateChange2('totalMaximumRate', props[props.model].maxDailyRate, data.target.value)}
        />
       

        <span>{sellerRateChange(props[props.model].maxDailyRate,props[props.model].markup)} </span>
        <Textfield
          model={`${props.model}.totalMaximumRate`}
          name="totalMaximumRate"
          id="totalMaximumRate"
          defaultValue={props[props.model].totalMaximumRate}
          htmlFor="dayRate"
          label="Total Maximum Rate"
          description={`The threshold for ${props.meta.domain.name} is $${props.meta.domain.priceMaximum}. If your total maximum rate is above this threshold, you will be asked to meet more criteria to prove you offer value for money.`}
          className={style.readOnly}
          readOnly
          // prefix={'$'}
        />
      </div>
    )}

    {/* Only see when consultant is picked in the placing candidates stage */}
    {props[props.model].placingCandidates === 'consultants' && (
      <div>
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
          prefix={`$`}
          postfix={'including GST'}
          label="Maximum daily rate (excluding mark-up)"
          description={`This rate must be based on a person who demonstrates skills equivalnet to  `}
          name="maxDailyRate"
          id="maxDailyRate"
          htmlFor="maxDailyRate"
          defaultValue={props[props.model].maxDailyRate}
        />
      </div>
    )}
    {props.formButtons}
  </Form>
)

SellerAssessmentRateStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {},
  onRateChange2: () => null
}

SellerAssessmentRateStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func,
  onRateChange2: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(SellerAssessmentRateStage)