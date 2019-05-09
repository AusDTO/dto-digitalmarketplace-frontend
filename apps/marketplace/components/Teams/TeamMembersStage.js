import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheadings from '@gov.au/headings'
import formProps from 'shared/form/formPropsSelector'

import commonStyles from './TeamStages.scss'

const TeamMembersStage = props => (
  <Form model={props.model}>
    <AUheadings level="1" size="xl">
      Team members
    </AUheadings>
    <div className={commonStyles.stageContentContainer}>
      <p>
        Members must already have a Digital Marketplace account in their name that ends in{' '}
        <span className={commonStyles.bold}>@humanservices.gov.au</span>
      </p>
    </div>
  </Form>
)

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(TeamMembersStage)
