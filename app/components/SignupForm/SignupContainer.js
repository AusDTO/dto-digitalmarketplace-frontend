import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import SignupForm from './SignupForm'

const NotFound = () => <div>Route not found</div>

const ExampleCreateUser = ({ match }) =>
  <div>
    {`Example Create User Component with token: ${match.params.tokenstring}`}
  </div>

const Routes = ({ match }) =>
  <Switch>
    <Route exact path={match.url} component={SignupForm} />
    <Route path={`${match.url}/createuser/:tokenstring`} component={ExampleCreateUser} />
    <Route component={NotFound} />
  </Switch>

export default withRouter(Routes)
