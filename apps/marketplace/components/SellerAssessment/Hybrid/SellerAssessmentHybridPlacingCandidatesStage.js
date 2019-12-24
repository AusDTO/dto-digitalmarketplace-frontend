import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { connect } from 'react-redux'
import formProps from 'shared/form/formPropsSelector'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import { AUradio } from '@gov.au/control-input'


export const done = formValues =>
  formValues.placingCandidatesRadio

const SellerAssessmentCandidatePool = props => (
  <Form
    model={props.model}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
  >
    <AUheadings level="1" size="xl">
      Placing candidates
    </AUheadings>
    <p>
    Your business will be placing candidates for  {props.meta.domain.name} roles by submitting:
    </p>
  
  <AUradio
    model={`${props.model}.placingCandidatesRadio`}
    label="contractors you organised through recruitment activies" 
    name="radio-ex" 
    id="radio-recrutierOnly-block" 
    block defaultChecked 
    />

  <AUradio
    model={`${props.model}.placingCandidatesRadio`}
    label="your own consultants" 
    name="radio-ex" 
    id="radio-consultantOnly-block" 
    block
  />

  <AUradio
    model={`${props.model}.placingCandidatesRadio`}
    label="both contractors and consultants" 
    name="radio-ex" 
    id="radio-Hybrid-block" 
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
