import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheadings from '@gov.au/headings'
import formProps from 'shared/form/formPropsSelector'

const TeamLeadsStage = props => (
  <Form model={props.model}>
    <AUheadings level="1" size="xl">
      Team leads
    </AUheadings>
    <div>
      <p>Team leads can:</p>
      <ul>
        <li>Add and remove members</li>
        <li>Specify what each member can do</li>
        <li>Create other team leads</li>
      </ul>
    </div>
  </Form>
)

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(TeamLeadsStage)
