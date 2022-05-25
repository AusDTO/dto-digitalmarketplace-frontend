import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import BuyICTPage from './pages/BuyICTPage'

export const rootPath = '/2'

export const Routes = () => (
  <Switch>
    <Route component={BuyICTPage} />
  </Switch>
)

const RootContainer = withRouter(Routes)

export default RootContainer
