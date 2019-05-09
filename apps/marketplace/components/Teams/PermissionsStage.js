import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheadings from '@gov.au/headings'
import formProps from 'shared/form/formPropsSelector'

import commonStyles from './TeamStages.scss'

const PermissionsStage = props => (
  <Form model={props.model}>
    <AUheadings level="1" size="xl">
      Permissions
    </AUheadings>
    <p>Team members automatically see opportunities created by anyone in the team.</p>
    <p className={commonStyles.bold}>What can each team member do?</p>
  </Form>
)

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(PermissionsStage)
