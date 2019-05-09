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
  </Form>
)

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(TeamLeadsStage)
