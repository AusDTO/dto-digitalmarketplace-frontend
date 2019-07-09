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

const TeamsPage = props => {
  const { errorMessage, organisation, showCreateTeamButton } = props

  const createTeamButton = (
    <AUbutton as="secondary" href={`${rootPath}/team/create`} key="Create a team">
      Create a team
    </AUbutton>
  )

  const navLinks = [
    { exact: false, id: 'teams-link', text: 'Teams', to: '/teams' },
    { exact: false, id: 'people-link', text: 'People', to: '/people' }
  ]

  const pageHeaderActions = showCreateTeamButton ? [createTeamButton] : []

  let hasFocused = false
  const setFocus = e => {
    if (!hasFocused) {
      hasFocused = true
      e.focus()
    }
  }

  return (
    <BrowserRouter basename={`${rootPath}/`}>
      <div>
        {errorMessage && (
          <ErrorBoxComponent
            title="A problem occurred loading team details"
            errorMessage={errorMessage}
            setFocus={setFocus}
            form={{}}
            invalidFields={[]}
          />
        )}
        <PageHeader actions={pageHeaderActions} organisation={organisation} title="Teams and people" />
        <PageNavigation links={navLinks} />
        <div>
          <Switch>
            <Route path="/teams" render={() => <TeamsOverview createTeamButton={createTeamButton} {...props} />} />
            <Route path="/people" render={() => <PeopleOverview {...props} />} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = state => ({
  errorMessage: state.app.errorMessage,
  organisation: state.teamsDashboard.organisation,
  showCreateTeamButton: state.teamsDashboard.showCreateTeamButton
})

export default withRouter(connect(mapStateToProps)(TeamsPage))
