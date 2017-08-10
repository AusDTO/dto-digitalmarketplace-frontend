import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import SignupForm from './SignupForm'
import CreateUser from '../CreateUser/CreateUser'
import UserOnboarding from '../CreateUser/UserOnboarding'
import NotFound from '../shared/NotFound'

const Routes = ({ match }) =>
  <Switch>
    <Route exact path={match.url} component={SignupForm} />
    <Route path={`${match.url}/success`} component={UserOnboarding} />
    <Route path={`${match.url}/createuser/:tokenstring`} component={CreateUser} />
    <Route component={NotFound} />
  </Switch>

export default withRouter(Routes)
