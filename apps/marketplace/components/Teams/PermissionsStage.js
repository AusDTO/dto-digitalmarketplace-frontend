import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import { AUcheckbox } from '@gov.au/control-input'
import formProps from 'shared/form/formPropsSelector'

import styles from './PermissionsStage.scss'
import commonStyles from './TeamStages.scss'

const PermissionsStage = props => (
  <Form model={props.model}>
    <AUheading level="1" size="xl">
      Permissions
    </AUheading>
    <p>Team members automatically see opportunities created by anyone in the team.</p>
    <p className={commonStyles.bold}>What can each team member do?</p>
    <div className={styles.allPermissionsContainer}>
      <AUcheckbox
        className={styles.allPermissionsCheckbox}
        id="all-permissions-checkbox"
        label="Every member can create drafts, publish opportunities, answer seller questions, download responses, create work orders, download reporting data"
        name="permissions"
      />
    </div>
  </Form>
)

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(PermissionsStage)
