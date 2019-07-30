import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { Link } from 'react-router-dom'

import AUheading from '@gov.au/headings'
import { AUcheckbox } from '@gov.au/control-input'
import { rootPath } from 'marketplace/routes'
import formProps from 'shared/form/formPropsSelector'
import PermissionsTable from './PermissionsTable'

import styles from './PermissionsStage.scss'
import commonStyles from './TeamStages.scss'

export class PermissionsStage extends Component {
  constructor(props) {
    super(props)

    this.allPermissionsChecked = this.allPermissionsChecked.bind(this)
    this.handleSelectAllPermissionsClick = this.handleSelectAllPermissionsClick.bind(this)
  }

  allPermissionsChecked = () => {
    const teamMembers = { ...this.props[this.props.model].teamMembers }
    let allPermissionsChecked = false

    // eslint-disable-next-line no-restricted-syntax
    for (const teamMember of Object.values(teamMembers)) {
      allPermissionsChecked = teamMember.permissions
        ? Object.values(teamMember.permissions).every(permission => permission === true)
        : false

      if (!allPermissionsChecked) break
    }

    return allPermissionsChecked
  }

  handleSelectAllPermissionsClick = applyAllPermissions => {
    const teamMembers = { ...this.props[this.props.model].teamMembers }
    const permissionsToApply = applyAllPermissions
      ? {
          answer_seller_questions: true,
          create_drafts: true,
          create_work_orders: true,
          download_responses: true,
          publish_opportunities: true
        }
      : {
          answer_seller_questions: false,
          create_drafts: false,
          create_work_orders: false,
          download_responses: false,
          publish_opportunities: false
        }

    Object.keys(teamMembers).forEach(userId => {
      teamMembers[userId] = { ...teamMembers[userId], permissions: permissionsToApply }
    })

    this.props.updateTeamMembers(teamMembers)
  }

  render = () => {
    const { formButtons, model, onSubmit, onSubmitFailed } = this.props
    const team = this.props[model]

    return (
      <Form model={model} onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>
        <AUheading level="1" size="xl">
          Permissions
        </AUheading>
        {team.teamMembers ? (
          <React.Fragment>
            <p>Team members automatically see opportunities created by anyone in the team.</p>
            <p className={commonStyles.bold}>What can each team member do?</p>
            <div className={styles.allPermissionsContainer}>
              <AUcheckbox
                checked={this.allPermissionsChecked()}
                className={styles.allPermissionsCheckbox}
                id="all-permissions-checkbox"
                label="Give all permissions to every member"
                name="permissions"
                onChange={() => {}}
                onClick={e => {
                  this.handleSelectAllPermissionsClick(e.target.checked)
                }}
              />
            </div>
            <PermissionsTable model={this.props.model} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p>
              You must <Link to={`${rootPath}/team/${team.id}/members`}>add team members</Link> to control access within
              your team.
            </p>
            <p>
              Team leads are able to create drafts, opportunities, answer seller questions, download responses, create
              work orders and download reporting data.
            </p>
          </React.Fragment>
        )}
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
  updateTeamMembers: teamMembers => dispatch(actions.change(`${props.model}.teamMembers`, teamMembers))
})

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsStage)
