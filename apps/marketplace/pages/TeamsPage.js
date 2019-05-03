import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import { rootPath } from 'marketplace/routes'
import PageHeader from '../components/PageHeader/PageHeader'

const TeamsPage = props => (
  <BrowserRouter basename={`${rootPath}/teams`}>
    <div>
      <PageHeader organisation={props.organisation} title="Teams and people" />
    </div>
  </BrowserRouter>
)

export default TeamsPage
