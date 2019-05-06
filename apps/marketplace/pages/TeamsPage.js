import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { rootPath } from 'marketplace/routes'

import AUbutton from '@gov.au/buttons'
import PageHeader from '../components/PageHeader/PageHeader'
import PageNavigation from '../components/PageNavigation/PageNavigation'
import People from '../components/Teams/People'
import Teams from '../components/Teams/Teams'

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
          <Route exact path="/" render={() => <Teams {...props} />} />
          <Route path="/people" render={() => <People {...props} />} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
)

export default TeamsPage
