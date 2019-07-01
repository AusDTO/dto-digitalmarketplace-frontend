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
      answer_seller_questions: false,
      create_drafts: false,
      create_work_orders: false,
      download_reporting_data: false,
      download_responses: false,
      publish_opportunities: false
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
                  checked={teamMembers[userId].permissions ? teamMembers[userId].permissions.create_drafts : false}
                  className={styles.permissionsTableCheckbox}
                  id="create-drafts-checkbox"
                  label=""
                  name="permissions"
                  onClick={e => {
                    this.handlePermissionClick(e.target.checked, userId, 'create_drafts')
                  }}
                />
              </td>
              <td>
                <AUcheckbox
                  checked={
                    teamMembers[userId].permissions ? teamMembers[userId].permissions.publish_opportunities : false
                  }
                  className={styles.permissionsTableCheckbox}
                  id="publish-opportunities-checkbox"
                  label=""
                  name="permissions"
                  onClick={e => {
                    this.handlePermissionClick(e.target.checked, userId, 'publish_opportunities')
                  }}
                />
              </td>
              <td>
                <AUcheckbox
                  checked={
                    teamMembers[userId].permissions ? teamMembers[userId].permissions.answer_seller_questions : false
                  }
                  className={styles.permissionsTableCheckbox}
                  id="answer-seller-questions-checkbox"
                  label=""
                  name="permissions"
                  onClick={e => {
                    this.handlePermissionClick(e.target.checked, userId, 'answer_seller_questions')
                  }}
                />
              </td>
              <td>
                <AUcheckbox
                  checked={teamMembers[userId].permissions ? teamMembers[userId].permissions.download_responses : false}
                  className={styles.permissionsTableCheckbox}
                  id="download-responses-checkbox"
                  label=""
                  name="permissions"
                  onClick={e => {
                    this.handlePermissionClick(e.target.checked, userId, 'download_responses')
                  }}
                />
              </td>
              <td>
                <AUcheckbox
                  checked={teamMembers[userId].permissions ? teamMembers[userId].permissions.create_work_orders : false}
                  className={styles.permissionsTableCheckbox}
                  id="create-work-orders-checkbox"
                  label=""
                  name="permissions"
                  onClick={e => {
                    this.handlePermissionClick(e.target.checked, userId, 'create_work_orders')
                  }}
                />
              </td>
              <td>
                <AUcheckbox
                  checked={
                    teamMembers[userId].permissions ? teamMembers[userId].permissions.download_reporting_data : false
                  }
                  className={styles.permissionsTableCheckbox}
                  id="download-reporting-data-checkbox"
                  label=""
                  name="permissions"
                  onClick={e => {
                    this.handlePermissionClick(e.target.checked, userId, 'download_reporting_data')
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
})

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsTable)
