import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SellerApplication from 'orams/components/SellerApplication/SellerApplication'
import NotFound from '../shared/NotFound'
import BusinessDetailsForm  from 'orams/components/BusinessDetailsForm';
export const rootPath = '/orams'

export const Routes = () =>
  <Switch>
    <Route exact path={rootPath} component={HomePage} />
    <Route exact path={`${rootPath}/sellers`} component={SellerApplication} />
    <Route component={NotFound} />
  </Switch>

const RootContainer = withRouter(Routes)

export default RootContainer
