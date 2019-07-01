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
import styles from './BuyerSpecialistAboutStage.scss'

const requiredTitle = v => required(v.title)
const requiredOrg = v => required(v.organisation)
const requiredSummary = v => required(v.summary)
const atLeastOneLocation = v => v.location && v.location.length > 0

export const done = v => requiredTitle(v) && requiredOrg(v) && requiredSummary(v) && atLeastOneLocation(v)

const BuyerSpecialistAboutStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        requiredTitle,
        requiredOrg,
        requiredSummary,
        atLeastOneLocation
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
        requiredTitle: 'Enter the title for your opportunity.',
        requiredOrg: 'Enter the name of your organisation.',
        requiredSummary: 'You must answer "what will the specialist do".',
        atLeastOneLocation: 'You must select at least one location.'
      }}
    />
    <Textfield
      model={`${props.model}.title`}
      label="Role title"
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
      label="Who will the specialist work for?"
      description="Write the full name of the organisation."
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
      label="What will the specialist do?"
      name="summary"
      id="summary"
      htmlFor="summary"
      defaultValue={props[props.model].summary}
      controlProps={{
        limit: 1000,
        rows: '10'
      }}
      validators={{
        required
      }}
      messages={{
        limitWords: 'What will the specialist do has exceeded the 1000 word limit'
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

BuyerSpecialistAboutStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerSpecialistAboutStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerSpecialistAboutStage)
