import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'
import locations from 'marketplace/components/BuyerBriefFlow/Locations'
import styles from './BuyerRFXAboutStage.scss'

const BuyerRFXAboutStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        requiredTitle: formValues => required(formValues.title),
        requiredOrg: formValues => required(formValues.organisation),
        requiredSummary: formValues => required(formValues.summary),
        requiredWorkingArrangements: formValues => required(formValues.workingArrangements),
        atLeastOneLocation: formValues => formValues.location && formValues.location.length > 0
      }
    }}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
  >
    <AUheadings level="1" size="xl">
      About
    </AUheadings>
    <ErrorAlert
      title="An error occurred"
      model={props.model}
      messages={{
        requiredTitle: 'You must add a title',
        requiredOrg: 'You must add the name of your department, agency or organisation',
        requiredSummary: 'You must add a summary of work to be done',
        requiredWorkingArrangements: 'You must add the working arrangements',
        atLeastOneLocation: 'You must select a location of where the work can be done'
      }}
    />
    <Textfield
      model={`${props.model}.title`}
      label="Title"
      description="Describe the outcome you need."
      placeholder="For example, 'Website redesign and development'."
      name="title"
      id="title"
      htmlFor="title"
      defaultValue={props[props.model].title}
      maxLength={100}
      showMaxLength
      validators={{
        required
      }}
    />
    <Textfield
      model={`${props.model}.organisation`}
      label="Department, agency or organisation"
      description="Who is the work for? Please write in full, including the state if necessary."
      placeholder="For example, Digital Transformation Agency instead of DTA."
      name="organisation"
      id="organisation"
      htmlFor="organisation"
      defaultValue={props[props.model].organisation}
      maxLength={150}
      showMaxLength
      validators={{
        required
      }}
    />
    <Textarea
      model={`${props.model}.summary`}
      label="Summary of work to be done"
      description={
        <React.Fragment>
          <p>
            From 1 July 2019 the Digital Marketplace will operate on an updated Master Agreement. You may choose to
            apply this new agreement to opportunities you publish from today, but the contract must be signed after 1
            July 2019. <br />
            <br />
            To apply the new Master Agreement for this opportunity, you must include this sentence: &apos;This
            opportunity will be subject to the terms and conditions of the new Master Agreement that takes effect from 1
            July 2019. More information can be found at{' '}
            <a href="/2/r/master-agreement-2019-07-01.pdf" rel="noopener noreferrer" target="_blank">
              http://marketplace.service.gov.au/2/r/master-agreement-2019-07-01.pdf
            </a>&apos;.
          </p>
        </React.Fragment>
      }
      name="summary"
      id="summary"
      htmlFor="summary"
      defaultValue={props[props.model].summary}
      controlProps={{ limit: 200 }}
      validators={{
        required
      }}
      messages={{
        limitWords: 'Your summary has exceeded the 150 word limit'
      }}
    />
    <AUheadings level="2" size="sm">
      Where can the work be done?
    </AUheadings>
    <div className={styles.locations}>
      {Object.keys(locations).map(key => (
        <CheckboxDetailsField
          key={key}
          model={`${props.model}.location[]`}
          id={`location_${key}`}
          name={`location_${key}`}
          label={locations[key]}
          value={locations[key]}
          detailsModel={props.model}
          validators={{}}
          messages={{}}
        />
      ))}
    </div>
    <Textarea
      model={`${props.model}.workingArrangements`}
      label="What are the working arrangements?"
      description="For example, on site at least 3 days a week for face-to-face team meetings."
      name="working_arrangements"
      id="working_arrangements"
      htmlFor="working_arrangements"
      defaultValue={props[props.model].workingArrangements}
      controlProps={{ limit: 150 }}
      validators={{
        required
      }}
      messages={{
        limitWords: 'Your working arrangements has exceeded the 150 word limit'
      }}
    />
    <Textfield
      model={`${props.model}.securityClearance`}
      label="Security clearance (optional)"
      description="Only request security clearance if access to classified material, environments or assets is required."
      name="clearance"
      id="clearance"
      htmlFor="clearance"
      defaultValue={props[props.model].securityClearance}
      maxLength={100}
      showMaxLength
    />
    {props.formButtons}
  </Form>
)

BuyerRFXAboutStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerRFXAboutStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerRFXAboutStage)
