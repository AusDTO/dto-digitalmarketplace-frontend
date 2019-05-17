import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'

const AboutTeamStage = props => (
  <Form model={props.model}>
    <AUheading level="1" size="xl">
      Name and email
    </AUheading>
    <Textfield
      defaultValue={props[props.model].teamName}
      description=""
      htmlFor="teamName"
      id="teamName"
      label="Team name"
      maxLength={100}
      model={`${props.model}.teamName`}
      name="teamName"
      placeholder=""
      validators={{}}
    />
    <Textfield
      defaultValue={props[props.model].emailAddress}
      description="Receive emails about opportunities created by any team member"
      htmlFor="emailAddress"
      id="emailAddress"
      label="Team email address (optional)"
      maxLength={100}
      model={`${props.model}.emailAddress`}
      name="emailAddress"
      placeholder=""
      validators={{}}
    />
    {props.formButtons}
  </Form>
)

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(AboutTeamStage)
