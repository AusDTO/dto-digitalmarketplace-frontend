import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { connect } from 'react-redux'
import RadioList from 'shared/form/RadioList'
import formProps from 'shared/form/formPropsSelector'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import AUheadings from '@gov.au/headings/lib/js/react.js'

export const greaterThanZero = formValues => parseInt(formValues.database_size, 10) > 0

export const validWholeNumber = formValues => formValues.database_size && /^[0-9]+$/.test(formValues.database_size)

export const done = formValues =>
  formValues.database_size && greaterThanZero(formValues) && validWholeNumber(formValues)

const SellerAssessmentHybridPlacingCandidatesStage = props => ({
  model,

}) => (
  <Form
    model={model}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
  >
    <AUheadings level="1" size="xl">
      Placing Candidates
    </AUheadings>

    <ErrorAlert
      model={model}
      messages={{
        validWholeNumber: 'The size of your candidate database must be a whole number (e.g. 1200)'
      }}
    />

    <RadioList
      id="previouslyWorked"
      label={`Has previously worked?`}
      name="previouslyWorked"
      model={`${model}.previouslyWorked`}
      validators={{
        required
      }}
      options={[
        {
          label: 'Yes',
          value: 'Yes'
        },
        {
          label: 'No',
          value: 'No'
        }
      ]}
      messages={{
        required: `"Has previously worked for the " is a required field`
      }}
  /> */}
      {props.formButtons}
  </Form>
)

SellerAssessmentHybridPlacingCandidatesStage.defaultProps = {
  model: '',
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
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(SellerAssessmentHybridPlacingCandidatesStage)
