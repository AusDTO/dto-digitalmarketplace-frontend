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
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import locations from 'marketplace/components/BuyerBriefFlow/Locations'
import styles from './BuyerATMAboutStage.scss'

const BuyerATMAboutStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        requiredTitle: formValues => required(formValues.title),
        requiredOrg: formValues => required(formValues.organisation),
        requiredSummary: formValues => required(formValues.summary),
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
        requiredTitle: 'Enter the title for your brief',
        requiredOrg: 'Enter the name of your organisation',
        requiredSummary: 'Enter a summary of your brief',
        requiredWorkingArrangements: 'Enter the working arrangements for your brief',
        atLeastOneLocation: 'You must select at least one location'
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
    {props.formButtons}
  </Form>
)

BuyerATMAboutStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerATMAboutStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerATMAboutStage)
