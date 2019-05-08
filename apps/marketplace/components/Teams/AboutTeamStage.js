import React from 'react'
import { Form } from 'react-redux-form'

import AUheadings from '@gov.au/headings'

const AboutTeamStage = props => (
  <Form model={props.model}>
    <AUheadings level="1" size="xl">
      Name and email
    </AUheadings>
  </Form>
)

export default AboutTeamStage
