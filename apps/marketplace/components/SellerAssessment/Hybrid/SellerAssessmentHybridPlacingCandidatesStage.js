import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import RadioList from 'shared/form/RadioList'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import Textfield from 'shared/form/Textfield'
import AUheadings from '@gov.au/headings/lib/js/react.js'

export const greaterThanZero = formValues => parseInt(formValues.database_size, 10) > 0

export const validWholeNumber = formValues => formValues.database_size && /^[0-9]+$/.test(formValues.database_size)

export const done = formValues => {
  if (props[props.model].placingCandidates === 'recruitment' || props[props.model].placingCandidates === 'hybrid') {
    formValues.placingCandidates &&
      formValues.database_size &&
      greaterThanZero(formValues) &&
      validWholeNumber(formValues)
  } else {
    formValues.placingCandidates
  }
}

export const hideRateStage = formValues => isHiddenConsultantRate(formValues)

const isHiddenConsultantRate = () => {
  let isHidden = true
  if (props[props.model].placingCandidates === 'recruitment' || props[props.model].placingCandidates === 'hybrid') {
    isHidden = false
  } else {
    isHidden = true
  }
  return isHidden
}

const SellerAssessmentHybridPlacingCandidatesStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        requiredChoice: formValues => formValues.placingCandidates
      }
    }}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
  >
    <AUheadings level="1" size="xl">
      Placing candidates
    </AUheadings>
    <ErrorAlert
      model={props.model}
      messages={{
        requiredChoice: 'You must select who can respond'
      }}
    />
    <p> Your business will be placing candidates for {props.meta.domain.name} category roles by submitting</p>
    <div>
      <RadioList
        id="placingCandidates"
        label=""
        name="placingCandidates"
        model={`${props.model}.placingCandidates`}
        options={[
          {
            label: 'contractors you organised through recruitment activities',
            value: 'recruitment'
          },
          {
            label: 'your own conusultants',
            value: 'consultants'
          },
          {
            label: 'both contractors and consultants',
            value: 'hybrid'
          }
        ]}
        messages={{}}
      />
    </div>
    {(props[props.model].placingCandidates === 'recruitment' || props[props.model].placingCandidates === 'hybrid') && (
      <div>
        <AUheadings level="1" size="lg">
          Candidate Pool
        </AUheadings>

        <ErrorAlert
          model={props.model}
          messages={{
            validWholeNumber: 'The size of your candidate database must be a whole number (e.g. 1200)'
          }}
        />
        <Textfield
          model={`${props.model}.database_size`}
          label="What is the size of your candidate database?"
          name="database_size"
          id="database_size"
          htmlFor="database_size"
          defaultValue={props[props.model].database_size}
        />
        <Textfield
          model={`${props.model}.placed_candidates`}
          label={`How many candidates have you placed in ${props.meta.domain.name} roles in the last 12 months?`}
          name="placed_candidates"
          id="placed_candidates"
          htmlFor="placed_candidates"
          defaultValue={props[props.model].placed_candidates}
        />
      </div>
    )}
    {props.formButtons}
  </Form>
)

SellerAssessmentHybridPlacingCandidatesStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

SellerAssessmentHybridPlacingCandidatesStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model),
  domains: state.brief.domains
})

export default connect(mapStateToProps)(SellerAssessmentHybridPlacingCandidatesStage)
