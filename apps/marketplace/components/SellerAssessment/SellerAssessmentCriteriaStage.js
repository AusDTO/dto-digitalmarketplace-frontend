import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import formProps from 'shared/form/formPropsSelector'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import styles from './SellerAssessmentCriteriaStage.scss'

const SellerAssessmentCriteriaStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        requiredMinimal: formValues => formValues.criteria && formValues.criteria.length >= props.meta.criteriaNeeded
      }
    }}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
  >
    <AUheadings level="1" size="xl">
      Assessment criteria
    </AUheadings>
    <ErrorAlert
      title="An error occurred"
      model={props.model}
      messages={{
        requiredMinimal: `You must select at least ${props.meta.criteriaNeeded} criteria`
      }}
    />
    <p>Select the criteria you will provide evidence for ({props.meta.criteriaNeeded} minimum required)</p>
    <div className={styles.criteria}>
      {props.meta.criteria.map(criteria => (
        <CheckboxDetailsField
          key={criteria.id}
          model={`${props.model}.criteria[]`}
          id={`criteria_${criteria.id}`}
          name={`criteria_${criteria.id}`}
          label={criteria.name}
          value={criteria.id}
          detailsModel={props.model}
          validators={{}}
          messages={{}}
        />
      ))}
    </div>
    {props.formButtons}
  </Form>
)

SellerAssessmentCriteriaStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

SellerAssessmentCriteriaStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(SellerAssessmentCriteriaStage)
