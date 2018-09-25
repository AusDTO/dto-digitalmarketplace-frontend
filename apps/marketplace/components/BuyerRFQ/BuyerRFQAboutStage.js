import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import AUheadings from '@gov.au/headings/lib/js/react.js'

const BuyerRFQAboutStage = props => (
  <div>
    <AUheadings level="1" size="xl">
      About
    </AUheadings>
    <Textfield
      model={`${props.model}.title`}
      label="Title"
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
      label="Organisation"
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
      label="Summary"
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
  </div>
)

BuyerRFQAboutStage.propTypes = {
  model: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerRFQAboutStage)
