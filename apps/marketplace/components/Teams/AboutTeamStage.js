import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheadings from '@gov.au/headings'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'

const AboutTeamStage = props => (
  <Form model={props.model}>
    <AUheadings level="1" size="xl">
      Name and email
    </AUheadings>
    <Textfield
      model={`${props.model}.name`}
      label="Team name"
      description=""
      placeholder=""
      name="name"
      id="name"
      htmlFor="name"
      defaultValue={props[props.model].name}
      maxLength={100}
      validators={{}}
    />
    <Textfield
      model={`${props.model}.emailAddress`}
      label="Team email address (optional)"
      description="Receive emails about opportunities created by any team member"
      placeholder=""
      name="emailAddress"
      id="emailAddress"
      htmlFor="emailAddress"
      defaultValue={props[props.model].emailAddress}
      maxLength={100}
      validators={{}}
    />
  </Form>
)

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(AboutTeamStage)
