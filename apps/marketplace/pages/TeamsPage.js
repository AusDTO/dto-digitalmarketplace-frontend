import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import { rootPath } from 'marketplace/routes'

import AUbutton from '@gov.au/buttons'
import PageHeader from '../components/PageHeader/PageHeader'

const createTeamButton = (
  <AUbutton as="secondary" href="#" key="Create a team">
    Create a team
  </AUbutton>
)

const TeamsPage = props => (
  <BrowserRouter basename={`${rootPath}/teams`}>
    <div>
      <PageHeader actions={[createTeamButton]} organisation={props.organisation} title="Teams and people" />
    </div>
  </BrowserRouter>
)

export default TeamsPage
