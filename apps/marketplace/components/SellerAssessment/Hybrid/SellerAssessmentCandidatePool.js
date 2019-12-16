import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { connect } from 'react-redux'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import AUheadings from '@gov.au/headings/lib/js/react.js'

export const greaterThanZero = formValues => parseInt(formValues.database_size, 10) > 0

export const validWholeNumber = formValues => formValues.database_size && /^[0-9]+$/.test(formValues.database_size)

export const done = formValues =>
  formValues.database_size && greaterThanZero(formValues) && validWholeNumber(formValues)

const SellerAssessmentCandidatePool = props => (
  <Form
    model={props.model}
    validators={{
      '': {
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
      model={`${props.model}.database_size`}
      label="What is the size of your candidate database?"
      name="database_size"
      id="database_size"
      htmlFor="database_size"
      defaultValue={props[props.model].database_size}
    />
    <Textfield
      model={`${props.model}.placed_candidates`}
      label={`How many candidates have you placed in ${props.meta.domain.name} roles in the last 12 months?"`}
      name="placed_candidates"
      id="placed_candidates"
      htmlFor="placed_candidates"
      defaultValue={props[props.model].placed_candidates}
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
