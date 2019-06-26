import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import { AUcheckbox } from '@gov.au/control-input'
import formProps from 'shared/form/formPropsSelector'
import PermissionsTable from './PermissionsTable'

import styles from './PermissionsStage.scss'
import commonStyles from './TeamStages.scss'

export class PermissionsStage extends Component {
  constructor(props) {
    super(props)

    this.handleSelectAllPermissionsClick = this.handleSelectAllPermissionsClick.bind(this)
  }

  handleSelectAllPermissionsClick(applyAllPermissions) {
    const userIds = Object.keys(this.props[this.props.model].teamMembers)
    const permissions = {}
    const permissionsToApply = applyAllPermissions
      ? {
          answerSellerQuestions: true,
          createDrafts: true,
          createWorkOrders: true,
          downloadReportingData: true,
          downloadResponses: true,
          publishOpportunities: true
        }
      : {
          answerSellerQuestions: false,
          createDrafts: false,
          createWorkOrders: false,
          downloadReportingData: false,
          downloadResponses: false,
          publishOpportunities: false
        }

    userIds.forEach(userId => {
      permissions[userId] = permissionsToApply
    })

    this.props.updateAllPermissions(permissions)
  }

  render() {
    const { formButtons, model, onSubmit, onSubmitFailed } = this.props

    return (
      <Form model={model} onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>
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
            onClick={e => {
              this.handleSelectAllPermissionsClick(e.target.checked)
            }}
          />
        </div>
        <PermissionsTable teamMembers={this.props[model].teamMembers} />
        {formButtons}
      </Form>
    )
  }
}

PermissionsStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  updateAllPermissions: permissions => dispatch(actions.change(`${props.model}.permissions`, permissions))
})

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsStage)
