import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import SignupContainer from './components/SignupForm/SignupContainer'
import NotFound from './components/shared/NotFound'

const Routes = () =>
  <Switch>
    <Route path="/signup" component={SignupContainer} />
    <Route component={NotFound} />
  </Switch>

export default withRouter(Routes)
