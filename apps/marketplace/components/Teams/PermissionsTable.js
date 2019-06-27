import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'

import { AUcheckbox } from '@gov.au/control-input'
import formProps from 'shared/form/formPropsSelector'

import commonStyles from './TeamStages.scss'
import styles from './PermissionsStage.scss'

export class PermissionsTable extends Component {
  constructor(props) {
    super(props)

    this.handlePermissionClick = this.handlePermissionClick.bind(this)
  }

  handlePermissionClick(applyPermission, userId, permissionType) {
    const teamMembers = { ...this.props[this.props.model].teamMembers }
    let permissionsToApply = {
      answerSellerQuestions: false,
      createDrafts: false,
      createWorkOrders: false,
      downloadReportingData: false,
      downloadResponses: false,
      publishOpportunities: false
    }

    if (!Object.prototype.hasOwnProperty.call(teamMembers[userId], 'permissions')) {
      permissionsToApply = { ...permissionsToApply, [permissionType]: applyPermission }
    } else {
      permissionsToApply = { ...teamMembers[userId].permissions, [permissionType]: applyPermission }
    }

    teamMembers[userId] = { ...teamMembers[userId], permissions: permissionsToApply }

    this.props.updateTeamMembers(teamMembers)
  }

  render() {
    const { teamMembers } = this.props[this.props.model]

    return (
      <table className={`${styles.permissionsTable} ${commonStyles.stageTable}`}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Create drafts</th>
            <th scope="col">Publish opportunities</th>
            <th scope="col">Answer seller questions</th>
            <th scope="col">Download responses</th>
            <th scope="col">Create work orders</th>
            <th scope="col">Download reporting data</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(teamMembers).map(userId => (
            <tr key={`item.${userId}`}>
              <td>{teamMembers[userId].name}</td>
              <td>
                <AUcheckbox
                  checked={teamMembers[userId].permissions ? teamMembers[userId].permissions.createDrafts : false}
                  className={styles.permissionsTableCheckbox}
                  id="create-drafts-checkbox"
                  label=""
                  name="permissions"
                  onClick={e => {
                    this.handlePermissionClick(e.target.checked, userId, 'createDrafts')
                  }}
                />
              </td>
              <td>
                <AUcheckbox
                  checked={
                    teamMembers[userId].permissions ? teamMembers[userId].permissions.publishOpportunities : false
                  }
                  className={styles.permissionsTableCheckbox}
                  id="publish-opportunities-checkbox"
                  label=""
                  name="permissions"
                  onClick={e => {
                    this.handlePermissionClick(e.target.checked, userId, 'publishOpportunities')
                  }}
                />
              </td>
              <td>
                <AUcheckbox
                  checked={
                    teamMembers[userId].permissions ? teamMembers[userId].permissions.answerSellerQuestions : false
                  }
                  className={styles.permissionsTableCheckbox}
                  id="answer-seller-questions-checkbox"
                  label=""
                  name="permissions"
                  onClick={e => {
                    this.handlePermissionClick(e.target.checked, userId, 'answerSellerQuestions')
                  }}
                />
              </td>
              <td>
                <AUcheckbox
                  checked={teamMembers[userId].permissions ? teamMembers[userId].permissions.downloadResponses : false}
                  className={styles.permissionsTableCheckbox}
                  id="download-responses-checkbox"
                  label=""
                  name="permissions"
                  onClick={e => {
                    this.handlePermissionClick(e.target.checked, userId, 'downloadResponses')
                  }}
                />
              </td>
              <td>
                <AUcheckbox
                  checked={teamMembers[userId].permissions ? teamMembers[userId].permissions.createWorkOrders : false}
                  className={styles.permissionsTableCheckbox}
                  id="create-work-orders-checkbox"
                  label=""
                  name="permissions"
                  onClick={e => {
                    this.handlePermissionClick(e.target.checked, userId, 'createWorkOrders')
                  }}
                />
              </td>
              <td>
                <AUcheckbox
                  checked={
                    teamMembers[userId].permissions ? teamMembers[userId].permissions.downloadReportingData : false
                  }
                  className={styles.permissionsTableCheckbox}
                  id="download-reporting-data-checkbox"
                  label=""
                  name="permissions"
                  onClick={e => {
                    this.handlePermissionClick(e.target.checked, userId, 'downloadReportingData')
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  updateTeamMembers: teamMembers => dispatch(actions.change(`${props.model}.teamMembers`, teamMembers))
  // updatePermissions: permissions => dispatch(actions.change(`${props.model}.permissions`, permissions))
})

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsTable)
