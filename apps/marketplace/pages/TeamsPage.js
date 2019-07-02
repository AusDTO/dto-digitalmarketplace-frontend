import React from 'react'

import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { rootPath } from 'marketplace/routes'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'

import AUbutton from '@gov.au/buttons'
import PageHeader from '../components/PageHeader/PageHeader'
import PageNavigation from '../components/PageNavigation/PageNavigation'
import PeopleOverview from '../components/Teams/PeopleOverview'
import TeamsOverview from '../components/Teams/TeamsOverview'

const getCreateTeamButton = () => (
  <AUbutton as="secondary" href={`${rootPath}/teams/create/about`} key="Create a team">
    Create a team
  </AUbutton>
)

let hasFocused = false
const setFocus = e => {
  if (!hasFocused) {
    hasFocused = true
    e.focus()
  }
}

const navLinks = [
  { exact: true, id: 'teams-link', text: 'Teams', to: '/' },
  { exact: false, id: 'people-link', text: 'People', to: '/people' }
]

const TeamsPage = props => (
  <BrowserRouter basename={`${rootPath}/teams`}>
    <div>
      {props.errorMessage && (
        <ErrorBoxComponent
          title="A problem occurred loading team details"
          errorMessage={props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )}
      <PageHeader actions={[getCreateTeamButton()]} organisation={props.organisation} title="Teams and people" />
      <PageNavigation links={navLinks} />
      <div>
        <Switch>
          <Route exact path="/" render={() => <TeamsOverview createTeamButton={getCreateTeamButton()} {...props} />} />
          <Route path="/people" render={() => <PeopleOverview {...props} />} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
)

const mapStateToProps = state => ({
  errorMessage: state.app.errorMessage,
  organisation: state.team.organisation
})

export default withRouter(connect(mapStateToProps)(TeamsPage))
