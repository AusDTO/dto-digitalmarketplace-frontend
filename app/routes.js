import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import SignupContainer from './components/SignupForm/SignupContainer'

const NotFound = () => <div>Route not found</div>

const Routes = () =>
  <Switch>
    <Route path="/signup" component={SignupContainer} />
    <Route component={NotFound} />
  </Switch>

export default withRouter(Routes)
