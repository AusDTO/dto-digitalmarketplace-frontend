import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import { rootPath } from 'marketplace/routes'

const TeamsPage = props => (
  <BrowserRouter basename={`${rootPath}/teams`}>
    <div>teams</div>
  </BrowserRouter>
)

export default TeamsPage
