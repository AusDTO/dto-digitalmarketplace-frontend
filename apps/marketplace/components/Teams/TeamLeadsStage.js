import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import { findTeamMember } from 'marketplace/actions/teamActions'
import formProps from 'shared/form/formPropsSelector'
import ItemSelect from '../ItemSelect/ItemSelect'

import commonStyles from './TeamStages.scss'

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
      teamLeads: {},
      teamLeadsToRemove: [],
      timeoutId: null,
      users: []
    }

    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.teamLeads !== this.state.teamLeads) {
      this.props.updateTeamLeads(this.state.teamLeads)
    }
  }

  handleItemClick(user) {
    this.setState(prevState => ({
      inputValue: '',
      teamLeads: {
        ...prevState.teamLeads,
        [user.id]: user.name
      },
      users: []
    }))
  }

  handleRemoveItem(userId) {
    const updatedTeamLeads = { ...this.state.teamLeads }
    delete updatedTeamLeads[userId]

    const usersToRemove = [...this.state.teamLeadsToRemove]
    usersToRemove.push(userId)

    this.setState({
      teamLeads: updatedTeamLeads,
      teamLeadsToRemove: usersToRemove
    })
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
          handleRemoveItem={this.handleRemoveItem}
          handleSearchChange={this.handleSearchChange}
          htmlFor="teamLeadName"
          id="teamLeadName"
          inputValue={this.state.inputValue}
          items={this.state.users}
          label="Team lead name"
          maxLength={100}
          minimumSearchChars={minimumSearchChars}
          model={`${model}.teamLeadName`}
          name="teamLeadName"
          placeholder=""
          resultIsEmpty={this.state.users.length < 1}
          resultListItems={teamMemberListItems}
          selectedItems={this.state.teamLeads}
          showSearchButton={false}
          summaryHeading="Current team leads"
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
  updateTeamLeads: teamLeads => dispatch(actions.change(`${props.model}.teamLeads`, teamLeads))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamLeadsStage)
