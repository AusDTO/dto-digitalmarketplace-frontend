import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import formProps from 'shared/form/formPropsSelector'
import StatefulError from 'shared/form/StatefulError'
import { required } from 'marketplace/components/validators'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import styles from './BuyerRFQAboutStage.scss'

const locations = {
  act: 'Australian Capital Territory',
  nsw: 'New South Wales',
  nt: 'Northern Territory',
  qld: 'Queensland',
  sa: 'South Australia',
  tas: 'Tasmania',
  vic: 'Victoria',
  wa: 'Western Australia',
  remote: 'Can be delivered remotely'
}

const BuyerRFQAboutStage = props => (
  <div>
    <AUheadings level="1" size="xl">
      About
    </AUheadings>
    <Textfield
      model={`${props.model}.title`}
      label="Title"
      description="Describe the outcome you need in 100 characters or less."
      placeholder="For example, 'Website redesign and development'."
      name="title"
      id="title"
      htmlFor="title"
      defaultValue={props[props.model].title}
      maxLength={100}
      validators={{
        required
      }}
      messages={{
        required: 'Enter a title for this brief'
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
      maxLength={100}
      validators={{
        required
      }}
      messages={{
        required: 'Enter the name of your organisation'
      }}
    />
    <Textarea
      model={`${props.model}.summary`}
      label="Summary of work to be done"
      name="summary"
      id="summary"
      htmlFor="summary"
      defaultValue={props[props.model].summary}
      controlProps={{ limit: 150 }}
      validators={{
        required
      }}
      messages={{
        required: 'Enter a summary of your brief',
        limitWords: 'Your summary has exceeded the 150 word limit'
      }}
    />
    <AUheadings level="2" size="sm">
      Where can the work be done?
    </AUheadings>
    <div className={styles.locations}>
      <StatefulError
        model={`${props.model}.location[]`}
        messages={{
          required: 'You must select at least one location'
        }}
        id="location_errors"
      />
      {Object.keys(locations).map(key => (
        <CheckboxDetailsField
          key={key}
          model={`${props.model}.location[]`}
          id={`location_${key}`}
          name={`location_${key}`}
          label={locations[key]}
          value={locations[key]}
          detailsModel={props.model}
          validators={{
            required
          }}
          messages={{}}
        />
      ))}
    </div>
    <Textarea
      model={`${props.model}.workingArrangements`}
      label="What are the working arrangements?"
      description="Describe how you want to work and include any limits on expenses. For example, on site at least 3 days a week for face-to-face team meetings."
      name="working_arrangements"
      id="working_arrangements"
      htmlFor="working_arrangements"
      defaultValue={props[props.model].workingArrangements}
      controlProps={{ limit: 150 }}
      validators={{
        required
      }}
      messages={{
        required: 'Enter the working arrangements for your brief',
        limitWords: 'Your working arrangements has exceeded the 150 word limit'
      }}
    />
  </div>
)

BuyerRFQAboutStage.propTypes = {
  model: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerRFQAboutStage)
