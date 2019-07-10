import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import { findTeamMember } from 'marketplace/actions/teamActions'
import formProps from 'shared/form/formPropsSelector'

import EmptyItemSelectMessage from './EmptyItemSelectMessage'
import TeamLeadActions from './TeamLeadActions'
import TeamLeadNameDescription from './TeamLeadNameDescription'
import MarketplaceAlert from '../Alerts/MarketplaceAlert'
import ItemSelect from '../ItemSelect/ItemSelect'
import TeamMemberListItems from './TeamMemberListItems'

import commonStyles from './TeamStages.scss'

export class TeamLeadsStage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      confirmChangeToTeamMember: false,
      confirmTeamLeadRemoval: false,
      inputValue: '',
      timeoutId: null,
      userToConfirm: {},
      users: []
    }

    this.handleCancelAction = this.handleCancelAction.bind(this)
    this.handleChangeToTeamMember = this.handleChangeToTeamMember.bind(this)
    this.handleConvertToTeamMember = this.handleConvertToTeamMember.bind(this)
    this.handleRemoveTeamLead = this.handleRemoveTeamLead.bind(this)
    this.handleRemoveTeamLeadClick = this.handleRemoveTeamLeadClick.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleUserClick = this.handleUserClick.bind(this)
    this.removeUser = this.removeUser.bind(this)
  }

  handleCancelAction = () => {
    this.setState({
      confirmChangeToTeamMember: false,
      confirmTeamLeadRemoval: false,
      userToConfirm: {}
    })
  }

  handleChangeToTeamMember = teamLead => {
    const newTeamLeads = this.removeUser(teamLead.id, 'teamLeads')
    this.props.updateTeamLeads(newTeamLeads)

    const newTeamMembers = { ...this.props[this.props.model].teamMembers }
    newTeamMembers[teamLead.id] = teamLead.data
    this.props.updateTeamMembers(newTeamMembers)

    this.setState({
      confirmChangeToTeamMember: false,
      userToConfirm: {}
    })
  }

  handleConvertToTeamMember = userId => {
    const teamLead = {
      id: userId,
      data: { ...this.props[this.props.model].teamLeads[userId] }
    }

    this.setState({
      confirmChangeToTeamMember: true,
      confirmTeamLeadRemoval: false,
      userToConfirm: teamLead
    })
  }

  handleRemoveTeamLead = userId => {
    const newTeamLeads = this.removeUser(userId, 'teamLeads')
    this.props.updateTeamLeads(newTeamLeads)

    this.setState({
      confirmTeamLeadRemoval: false,
      userToConfirm: {}
    })
  }

  handleRemoveTeamLeadClick = userId => {
    const teamLead = {
      id: userId,
      data: { ...this.props[this.props.model].teamLeads[userId] }
    }

    this.setState({
      confirmChangeToTeamMember: false,
      confirmTeamLeadRemoval: true,
      userToConfirm: teamLead
    })
  }

  handleSearchChange = e => {
    this.setState({
      inputValue: e.target.value
    })

    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId)
    }

    this.setState({
      timeoutId: setTimeout(() => {
        if (this.state.inputValue && this.state.inputValue.length >= this.props.minimumSearchChars) {
          this.props
            .findTeamMember(this.state.inputValue)
            .then(data => {
              this.setState({
                users: data.users
              })
            })
            .catch(() => {})
        } else {
          this.setState({
            users: []
          })
        }
      }, 500)
    })
  }

  handleUserClick = user => {
    this.setState({
      inputValue: '',
      users: []
    })

    const newTeamLeads = { ...this.props[this.props.model].teamLeads }
    newTeamLeads[user.id] = {
      emailAddress: user.email,
      name: user.name
    }

    this.props.updateTeamLeads(newTeamLeads)

    // Remove as team member if user has been added as one
    const teamMembers = { ...this.props[this.props.model].teamMembers }
    if (teamMembers[user.id]) {
      const newTeamMembers = this.removeUser(user.id, 'teamMembers')
      this.props.updateTeamMembers(newTeamMembers)
    }
  }

  removeUser = (userId, property) => {
    const newObject = { ...this.props[this.props.model][property] }
    delete newObject[userId]
    return newObject
  }

  render = () => {
    const { formButtons, minimumSearchChars, model, onSubmit, onSubmitFailed } = this.props
    const teamLeadNameDescription = <TeamLeadNameDescription domain={this.props[model].domain} />
    const emptyResultsMessage = <EmptyItemSelectMessage />
    const teamMemberListItems = (
      <TeamMemberListItems handleTeamMemberClick={this.handleUserClick} teamMembers={this.state.users} />
    )

    const teamLeadActions = (
      <TeamLeadActions
        handleConvertToTeamMember={this.handleConvertToTeamMember}
        handleRemoveTeamLead={this.handleRemoveTeamLeadClick}
      />
    )

    const ChangeToTeamMemberConfirmationMessage = props => {
      const { name } = props

      return (
        <div>
          <p>
            Are you sure you want to change <span className={commonStyles.bold}>{name}</span> to a team member?
          </p>
          <p>They will no longer be able to add and remove members, specify permissions or create team leads.</p>
        </div>
      )
    }

    const RemoveTeamLeadConfirmationMessage = props => {
      const { name } = props

      return (
        <div>
          <p>
            Are you sure you want to remove <span className={commonStyles.bold}>{name}</span> from your team?
          </p>
          <p>You will become the owner of their opportunities.</p>
        </div>
      )
    }

    return (
      <Form model={model} onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>
        {this.state.confirmChangeToTeamMember && (
          <MarketplaceAlert
            cancelButtonText="Do not change"
            confirmButtonText="Yes, change to member"
            content={<ChangeToTeamMemberConfirmationMessage name={this.state.userToConfirm.data.name} />}
            handleCancelClick={this.handleCancelAction}
            handleConfirmClick={() => this.handleChangeToTeamMember(this.state.userToConfirm)}
            type="warning"
          />
        )}
        {this.state.confirmTeamLeadRemoval && (
          <MarketplaceAlert
            cancelButtonText="Do not remove"
            confirmButtonText="Yes, remove"
            content={<RemoveTeamLeadConfirmationMessage name={this.state.userToConfirm.data.name} />}
            handleCancelClick={this.handleCancelAction}
            handleConfirmClick={() => this.handleRemoveTeamLead(this.state.userToConfirm.id)}
            type="warning"
          />
        )}
        <AUheading level="1" size="xl">
          Team leads
        </AUheading>
        <div className={commonStyles.stageContentContainer}>
          <p className={commonStyles.bold}>Team leads can:</p>
          <ul className={commonStyles.stageList}>
            <li>Add and remove members</li>
            <li>Specify what each member can do</li>
            <li>Assign other team leads</li>
          </ul>
        </div>
        <ItemSelect
          defaultValue={this.props[model].teamLeadName}
          description={teamLeadNameDescription}
          emptyResultsMessage={emptyResultsMessage}
          handleSearchChange={this.handleSearchChange}
          htmlFor="teamLeadName"
          id="teamLeadName"
          inputValue={this.state.inputValue}
          items={this.state.users}
          label="Team lead name"
          maxLength={100}
          minimumSearchChars={minimumSearchChars}
          model={`${model}.teamLeads`}
          name="teamLeadName"
          placeholder=""
          resultIsEmpty={this.state.users.length < 1}
          resultListItems={teamMemberListItems}
          selectedItemActions={teamLeadActions}
          selectedItemsHeading="Current team leads"
          showSearchButton={false}
          validators={{}}
        />
        {formButtons}
      </Form>
    )
  }
}

TeamLeadsStage.defaultProps = {
  minimumSearchChars: 2,
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

TeamLeadsStage.propTypes = {
  formButtons: PropTypes.node.isRequired,
  minimumSearchChars: PropTypes.number,
  model: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  findTeamMember: keyword => dispatch(findTeamMember(keyword)),
  updateTeamLeads: teamLeads => dispatch(actions.change(`${props.model}.teamLeads`, teamLeads)),
  updateTeamMembers: teamMembers => dispatch(actions.change(`${props.model}.teamMembers`, teamMembers))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamLeadsStage)
