import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'

import HomePage from 'orams/pages/HomePage'
import EditProfilePage from 'orams/pages/EditProfilePage'
import NotFound from 'shared/NotFound'

export const rootPath = '/orams'

export const Routes = () =>
  <Switch>
    <Route exact path={rootPath} component={HomePage} />
    <Route path={`${rootPath}/sellers`} component={EditProfilePage} />
    <Route component={NotFound} />
  </Switch>

const RootContainer = withRouter(Routes)

export default RootContainer
