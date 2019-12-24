import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { connect } from 'react-redux'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import { AUradio } from '@gov.au/control-input'

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
      Placing candidates
    </AUheadings>

    <ErrorAlert
      model={props.model}
      messages={{
        validWholeNumber: 'The size of your candidate database must be a whole number (e.g. 1200)'
      }}
    />
    <p>
    Your business will be placing candidates for  {props.meta.domain.name} roles by submitting:
    </p>
  
  <AUradio 
    label="contractors you organised through recruitment activies" 
    name="radio-ex" 
    id="radio-phone-block" 
    block defaultChecked 
    />

  <AUradio 
    label="your own consultants" 
    name="radio-ex" 
    id="radio-tablet-block" 
    block
  />

  <AUradio 
    label="both contractors and consultants" 
    name="radio-ex" 
    id="radio-laptop-block" 
    block 
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
