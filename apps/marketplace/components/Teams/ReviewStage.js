import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import formProps from 'shared/form/formPropsSelector'

const ReviewStage = props => (
  <Form model={props.model}>
    <AUheading level="1" size="xl">
      Review
    </AUheading>
    <AUheading level="2" size="lg">
      Golden State Warriors
    </AUheading>
  </Form>
)

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(ReviewStage)
