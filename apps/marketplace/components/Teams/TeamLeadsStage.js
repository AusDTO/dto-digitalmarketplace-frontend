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

const TeamLeadActions = props => {
  const { handleConvertToTeamMember, handleRemoveTeamLead, id } = props

  return (
    <AUlinklist
      className={actionStyles.selectedItemActions}
      inline
      items={[
        {
          link: '#change-to-member',
          onClick: e => {
            e.preventDefault()
            handleConvertToTeamMember(id)
          },
          text: 'Change to member'
        },
        {
          className: commonStyles.removeLink,
          link: '#remove',
          onClick: e => {
            e.preventDefault()
            handleRemoveTeamLead(id)
          },
          text: 'Remove'
        }
      ]}
    />
  )
}

const TeamLeadNameDescription = props => (
  <span>
    Team leads must already have a Digital Marketplace account in their name that ends in{' '}
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

export class TeamLeadsStage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      timeoutId: null,
      users: []
    }

    this.handleConvertToTeamMember = this.handleConvertToTeamMember.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.removeTeamLead = this.removeTeamLead.bind(this)
  }

  removeTeamLead(userId) {
    const newTeamLeads = { ...this.props[this.props.model].teamLeads }
    delete newTeamLeads[userId]
    return newTeamLeads
  }

  handleConvertToTeamMember(userId) {
    const user = { id: userId, name: this.props[this.props.model].teamLeads[userId] }

    const newTeamLeads = this.removeTeamLead(userId)
    this.props.updateTeamLeads(newTeamLeads)

    const newTeamMembers = { ...this.props[this.props.model].teamMembers }
    newTeamMembers[user.id] = user.name
    this.props.updateTeamMembers(newTeamMembers)
  }

  handleItemClick(user) {
    this.setState({
      inputValue: '',
      users: []
    })

    const newTeamLeads = { ...this.props[this.props.model].teamLeads }
    newTeamLeads[user.id] = user.name
    this.props.updateTeamLeads(newTeamLeads)
  }

  handleRemoveItem(userId) {
    const newTeamLeads = this.removeTeamLead(userId)
    this.props.updateTeamLeads(newTeamLeads)
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
    const teamLeadNameDescription = <TeamLeadNameDescription domain={this.props[model].domain} />
    const emptyResultsMessage = <EmptyResultsMessage />
    const teamMemberListItems = <TeamMemberListItems handleItemClick={this.handleItemClick} items={this.state.users} />
    const teamLeadActions = (
      <TeamLeadActions
        handleConvertToTeamMember={this.handleConvertToTeamMember}
        handleRemoveTeamLead={this.handleRemoveItem}
      />
    )

    return (
      <Form model={model} onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>
        <AUheading level="1" size="xl">
          Team leads
        </AUheading>
        <div className={commonStyles.stageContentContainer}>
          <p className={commonStyles.bold}>Team leads can:</p>
          <ul className={commonStyles.stageList}>
            <li>Add and remove members</li>
            <li>Specify what each member can do</li>
            <li>Create other team leads</li>
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

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  findTeamMember: keyword => dispatch(findTeamMember(keyword)),
  updateTeamLeads: teamLeads => dispatch(actions.change(`${props.model}.teamLeads`, teamLeads)),
  updateTeamMembers: teamMembers => dispatch(actions.change(`${props.model}.teamMembers`, teamMembers))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamLeadsStage)
