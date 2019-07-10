import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import { findTeamMember } from 'marketplace/actions/teamActions'
import formProps from 'shared/form/formPropsSelector'

import ChangeToTeamLeadMessage from './ChangeToTeamLeadMessage'
import EmptyItemSelectMessage from './EmptyItemSelectMessage'
import RemoveTeamMemberMessage from './RemoveTeamMemberMessage'
import TeamMemberActions from './TeamMemberActions'
import TeamMemberNameDescription from './TeamMemberNameDescription'
import TeamMemberListItems from './TeamMemberListItems'

import MarketplaceAlert from '../Alerts/MarketplaceAlert'
import ItemSelect from '../ItemSelect/ItemSelect'

export class TeamMembersStage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      confirmChangeToTeamLead: false,
      confirmTeamMemberRemoval: false,
      inputValue: '',
      timeoutId: null,
      userToConfirm: {},
      users: []
    }

    this.handleCancelAction = this.handleCancelAction.bind(this)
    this.handleChangeToTeamLead = this.handleChangeToTeamLead.bind(this)
    this.handleConvertToTeamLead = this.handleConvertToTeamLead.bind(this)
    this.handleRemoveTeamMember = this.handleRemoveTeamMember.bind(this)
    this.handleRemoveTeamMemberClick = this.handleRemoveTeamMemberClick.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleUserClick = this.handleUserClick.bind(this)
    this.removeUser = this.removeUser.bind(this)
  }

  handleCancelAction = () => {
    this.setState({
      confirmChangeToTeamLead: false,
      confirmTeamMemberRemoval: false,
      userToConfirm: {}
    })
  }

  handleChangeToTeamLead = teamMember => {
    const newTeamMembers = this.removeUser(teamMember.id, 'teamMembers')
    this.props.updateTeamMembers(newTeamMembers)

    const newTeamLeads = { ...this.props[this.props.model].teamLeads }
    newTeamLeads[teamMember.id] = teamMember.data
    this.props.updateTeamLeads(newTeamLeads)

    this.setState({
      confirmChangeToTeamLead: false,
      userToConfirm: {}
    })
  }

  handleConvertToTeamLead = userId => {
    const teamLead = {
      id: userId,
      data: { ...this.props[this.props.model].teamMembers[userId] }
    }

    this.setState({
      confirmChangeToTeamLead: true,
      confirmTeamMemberRemoval: false,
      userToConfirm: teamLead
    })
  }

  handleRemoveTeamMember = userId => {
    const newTeamMembers = this.removeUser(userId, 'teamMembers')
    this.props.updateTeamMembers(newTeamMembers)

    this.setState({
      confirmTeamMemberRemoval: false,
      userToConfirm: {}
    })
  }

  handleRemoveTeamMemberClick = userId => {
    const teamMember = {
      id: userId,
      data: { ...this.props[this.props.model].teamMembers[userId] }
    }

    this.setState({
      confirmChangeToTeamLead: false,
      confirmTeamMemberRemoval: true,
      userToConfirm: teamMember
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

    const newTeamMembers = { ...this.props[this.props.model].teamMembers }
    newTeamMembers[user.id] = {
      emailAddress: user.email,
      name: user.name
    }

    this.props.updateTeamMembers(newTeamMembers)

    // Remove as team lead if user has been added as one
    const teamLeads = { ...this.props[this.props.model].teamLeads }
    if (teamLeads[user.id]) {
      const newTeamLeads = this.removeUser(user.id, 'teamLeads')
      this.props.updateTeamLeads(newTeamLeads)
    }
  }

  removeUser = (userId, property) => {
    const newObject = { ...this.props[this.props.model][property] }
    delete newObject[userId]
    return newObject
  }

  render = () => {
    const { formButtons, minimumSearchChars, model, onSubmit, onSubmitFailed } = this.props
    const teamMemberNameDescription = <TeamMemberNameDescription domain={this.props[model].domain} />
    const emptyResultsMessage = <EmptyItemSelectMessage />
    const teamMemberListItems = (
      <TeamMemberListItems handleTeamMemberClick={this.handleUserClick} teamMembers={this.state.users} />
    )

    const teamMemberActions = (
      <TeamMemberActions
        handleConvertToTeamLead={this.handleConvertToTeamLead}
        handleRemoveTeamMember={this.handleRemoveTeamMemberClick}
      />
    )

    return (
      <Form model={model} onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>
        {this.state.confirmChangeToTeamLead && (
          <MarketplaceAlert
            cancelButtonText="Do not change"
            confirmButtonText="Yes, change to team lead"
            content={<ChangeToTeamLeadMessage name={this.state.userToConfirm.data.name} />}
            handleCancelClick={this.handleCancelAction}
            handleConfirmClick={() => this.handleChangeToTeamLead(this.state.userToConfirm)}
            type="warning"
          />
        )}
        {this.state.confirmTeamMemberRemoval && (
          <MarketplaceAlert
            cancelButtonText="Do not remove"
            confirmButtonText="Yes, remove"
            content={<RemoveTeamMemberMessage name={this.state.userToConfirm.data.name} />}
            handleCancelClick={this.handleCancelAction}
            handleConfirmClick={() => this.handleRemoveTeamMember(this.state.userToConfirm.id)}
            type="warning"
          />
        )}
        <AUheading level="1" size="xl">
          Team members
        </AUheading>
        <ItemSelect
          defaultValue=""
          description={teamMemberNameDescription}
          emptyResultsMessage={emptyResultsMessage}
          handleSearchChange={this.handleSearchChange}
          htmlFor="teamMemberName"
          id="teamMemberName"
          inputValue={this.state.inputValue}
          items={this.state.users}
          label="Team member name"
          maxLength={100}
          minimumSearchChars={minimumSearchChars}
          model={`${model}.teamMembers`}
          name="teamMemberName"
          placeholder=""
          resultIsEmpty={this.state.users.length < 1}
          resultListItems={teamMemberListItems}
          selectedItemActions={teamMemberActions}
          selectedItemsHeading="Current team members"
          showSearchButton={false}
          validators={{}}
        />
        {formButtons}
      </Form>
    )
  }
}

TeamMembersStage.defaultProps = {
  minimumSearchChars: 2,
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

TeamMembersStage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamMembersStage)
