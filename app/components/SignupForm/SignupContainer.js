import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import SignupForm from './SignupForm'
import CreateUser from './CreateUser'

const NotFound = () => <div>Route not found</div>

const Routes = ({ match }) =>
  <Switch>
    <Route exact path={match.url} component={SignupForm} />
    <Route path={`${match.url}/createuser/:tokenstring`} component={CreateUser} />
    <Route component={NotFound} />
  </Switch>

export default withRouter(Routes)
