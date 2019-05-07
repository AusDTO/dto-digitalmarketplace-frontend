import React from 'react'

import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { rootPath } from 'marketplace/routes'

import AUbutton from '@gov.au/buttons'
import PageHeader from '../components/PageHeader/PageHeader'
import PageNavigation from '../components/PageNavigation/PageNavigation'
import PeopleOverview from '../components/Teams/PeopleOverview'
import TeamsOverview from '../components/Teams/TeamsOverview'

const createTeamButton = (
  <AUbutton as="secondary" href="#" key="Create a team">
    Create a team
  </AUbutton>
)

const navLinks = [
  { exact: true, id: 'teams-link', text: 'Teams', to: '/' },
  { exact: false, id: 'people-link', text: 'People', to: '/people' }
]

const TeamsPage = props => (
  <BrowserRouter basename={`${rootPath}/teams`}>
    <div>
      <PageHeader actions={[createTeamButton]} organisation={props.organisation} title="Teams and people" />
      <PageNavigation links={navLinks} />
      <div>
        <Switch>
          <Route exact path="/" render={() => <TeamsOverview {...props} />} />
          <Route path="/people" render={() => <PeopleOverview {...props} />} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
)

const mapStateToProps = state => ({
  organisation: state.team.organisation
})

export default withRouter(connect(mapStateToProps)(TeamsPage))
