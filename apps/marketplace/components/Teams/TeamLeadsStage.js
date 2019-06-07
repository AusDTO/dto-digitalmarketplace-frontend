import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

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
      <a href={`#${item}`}>
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

    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleSearchChange(e) {
    const keywords = e.target.value
    let timeoutHandle = null

    this.setState({
      inputValue: keywords
    })

    if (timeoutHandle) {
      clearTimeout(timeoutHandle)
    }

    timeoutHandle = setTimeout(() => {
      if (keywords && keywords.length >= this.props.minimumSearchChars) {
        this.props
          .findTeamMember(keywords)
          .then(data => {
            const noResults = !data.users.length > 0
            this.setState({
              users: data.users,
              noResults
            })
          })
          .catch(() => {})
      } else {
        this.setState({
          users: []
        })
      }
    }, 500)
  }

  render() {
    const { formButtons, minimumSearchChars, model, onSubmit, onSubmitFailed } = this.props
    const teamLeadNameDescription = <TeamLeadNameDescription domain={this.props[model].domain} />
    const emptyResultsMessage = <EmptyResultsMessage />
    const teamMemberListItems = <TeamMemberListItems items={this.state.users} />

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
          model={`${model}.teamLeadName`}
          name="teamLeadName"
          placeholder=""
          resultIsEmpty={this.state.users.length < 1}
          resultListItems={teamMemberListItems}
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

const mapDispatchToProps = dispatch => ({
  findTeamMember: keyword => dispatch(findTeamMember(keyword))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamLeadsStage)
