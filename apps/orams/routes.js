import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SellerApplicationPage from './pages/SellerApplicationPage'
import NotFound from '../shared/NotFound'

export const rootPath = '/orams'

export const Routes = () =>
  <Switch>
    <Route exact path={rootPath} component={HomePage} />
    <Route path={`${rootPath}/sellers`} component={SellerApplicationPage} />
    <Route component={NotFound} />
  </Switch>

const RootContainer = withRouter(Routes)

export default RootContainer
