import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import AUheading from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import locations from 'marketplace/components/BuyerBriefFlow/Locations'
import styles from './BuyerTrainingAboutStage.scss'

const requiredTitle = formValues => required(formValues.title)
const requiredOrg = formValues => required(formValues.organisation)
const requiredSummary = formValues => required(formValues.summary)
const requiredWorkingArrangements = formValues => required(formValues.workingArrangements)
const atLeastOneLocation = formValues => formValues.location && formValues.location.length > 0

export const done = v =>
  requiredTitle(v) && requiredOrg(v) && requiredSummary(v) && requiredWorkingArrangements(v) && atLeastOneLocation(v)

const BuyerTrainingAboutStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        requiredTitle,
        requiredOrg,
        requiredSummary,
        requiredWorkingArrangements,
        atLeastOneLocation
      }
    }}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
  >
    <AUheading level="1" size="xl">
      About
    </AUheading>
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
      validators={{
        required
      }}
    />
    <Textarea
      model={`${props.model}.summary`}
      label="Summary of work to be done"
      name="summary"
      id="summary"
      htmlFor="summary"
      defaultValue={props[props.model].summary}
      controlProps={{ limit: 200 }}
      validators={{
        required
      }}
      messages={{
        limitWords: 'Your summary has exceeded the 200 word limit'
      }}
    />
    <AUheading level="2" size="sm">
      Where can the work be done?
    </AUheading>
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
        limitWords: 'Your working arrangements have exceeded the 150 word limit'
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
    />
    {props.formButtons}
  </Form>
)

BuyerTrainingAboutStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerTrainingAboutStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerTrainingAboutStage)
