import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { connect } from 'react-redux'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import AUheadings from '@gov.au/headings/lib/js/react.js'


const maxDailyRateLimit = 99999

export const greaterThanZero = formValues => parseInt(formValues.maxDailyRate, 10) > 0

export const lessThanLimit = formValues => parseInt(formValues.maxDailyRate, 10) < maxDailyRateLimit

export const validWholeNumber = formValues => formValues.maxDailyRate && /^[0-9]+$/.test(formValues.maxDailyRate)

export const done = formValues =>
  formValues.maxDailyRate && greaterThanZero(formValues) && lessThanLimit(formValues) && validWholeNumber(formValues)


const SellerAssessmentCandidatePool = props => (
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
    Candidate Pool
  </AUheadings>

  <ErrorAlert
    model={props.model}
    messages={{
      validWholeNumber: 'The size of your candidate database must be a whole number (e.g. 1200)'
    }}
  />
  <Textfield
    model={`${props.model}.candidateSize`}
    label="What is the size of your candidate database?"
    name="candidateSize"
    id="candidateSize"
    htmlFor="CandidateSize"
    defaultValue={`0`}
    />
  <Textfield
    model={`${props.model}.candidatesPlacedIn12Months`}
    label={`How many candidates have you placed in ${props.meta.domain.name} roles in the last 12 months?"`}
    name="candidatesPlacedIn12Months"
    id="candidatesPlacedIn12Months"
    htmlFor="candidatesPlacedIn12Months"
    defaultValue={`0`}
    />
  {props.formButtons}
</Form>
)

SellerAssessmentCandidatePool.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

SellerAssessmentCandidatePool.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(SellerAssessmentCandidatePool)
