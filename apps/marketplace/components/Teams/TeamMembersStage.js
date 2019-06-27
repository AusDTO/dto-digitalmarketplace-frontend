import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import AUlinklist from '@gov.au/link-list/lib/js/react.js'
import { findTeamMember } from 'marketplace/actions/teamActions'
import formProps from 'shared/form/formPropsSelector'
import ItemSelect from '../ItemSelect/ItemSelect'

import commonStyles from './TeamStages.scss'
import actionStyles from '../ItemSelect/SelectedItems.scss'

const TeamMemberActions = props => {
  const { handleConvertToTeamLead, handleRemoveTeamMember, id } = props

  return (
    <AUlinklist
      className={actionStyles.selectedItemActions}
      inline
      items={[
        {
          link: '#change-to-lead',
          onClick: e => {
            e.preventDefault()
            handleConvertToTeamLead(id)
          },
          text: 'Change to lead'
        },
        {
          className: commonStyles.removeLink,
          link: '#remove',
          onClick: e => {
            e.preventDefault()
            handleRemoveTeamMember(id)
          },
          text: 'Remove'
        }
      ]}
    />
  )
}

const TeamMemberNameDescription = props => (
  <span>
    Members must already have a Digital Marketplace account in their name that ends in{' '}
    <span className={commonStyles.bold}>@{props.domain}</span>
  </span>
)

const EmptyResultsMessage = () => <li>User cannot be found.</li>

const TeamMemberListItems = props =>
  props.items.map(item => (
    <li key={item.id}>
      <a
        href={`#${item.id}`}
        onClick={e => {
          e.preventDefault()
          props.handleItemClick(item)
        }}
      >
        {item.name} ({item.email})
      </a>
    </li>
  ))

export class TeamMembersStage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      timeoutId: null,
      users: []
    }

    this.handleConvertToTeamLead = this.handleConvertToTeamLead.bind(this)
    this.handleRemoveTeamMember = this.handleRemoveTeamMember.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleUserClick = this.handleUserClick.bind(this)
    this.removeTeamMember = this.removeTeamMember.bind(this)
  }

  removeTeamMember(userId) {
    const newTeamMembers = { ...this.props[this.props.model].teamMembers }
    delete newTeamMembers[userId]
    return newTeamMembers
  }

  handleConvertToTeamLead(userId) {
    const user = { id: userId, name: this.props[this.props.model].teamMembers[userId] }

    const newTeamMembers = this.removeTeamMember(userId)
    this.props.updateTeamMembers(newTeamMembers)

    const newTeamLeads = { ...this.props[this.props.model].teamLeads }
    newTeamLeads[user.id] = user.name
    this.props.updateTeamLeads(newTeamLeads)
  }

  handleUserClick(user) {
    this.setState({
      inputValue: '',
      users: []
    })

    const newTeamMembers = { ...this.props[this.props.model].teamMembers }
    newTeamMembers[user.id] = { name: user.name }
    this.props.updateTeamMembers(newTeamMembers)
  }

  handleRemoveTeamMember(userId) {
    const newTeamMembers = this.removeTeamMember(userId)
    this.props.updateTeamMembers(newTeamMembers)
  }

  handleSearchChange(e) {
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

  render() {
    const { formButtons, minimumSearchChars, model, onSubmit, onSubmitFailed } = this.props
    const teamMemberNameDescription = <TeamMemberNameDescription domain={this.props[model].domain} />
    const emptyResultsMessage = <EmptyResultsMessage />
    const teamMemberListItems = <TeamMemberListItems handleItemClick={this.handleUserClick} items={this.state.users} />
    const teamMemberActions = (
      <TeamMemberActions
        handleConvertToTeamLead={this.handleConvertToTeamLead}
        handleRemoveTeamMember={this.handleRemoveTeamMember}
      />
    )

    return (
      <Form model={model} onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>
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

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  findTeamMember: keyword => dispatch(findTeamMember(keyword)),
  updateTeamLeads: teamLeads => dispatch(actions.change(`${props.model}.teamLeads`, teamLeads)),
  updateTeamMembers: teamMembers => dispatch(actions.change(`${props.model}.teamMembers`, teamMembers))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamMembersStage)
