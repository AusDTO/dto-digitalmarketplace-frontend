import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import NotFound from '../shared/NotFound'
import ResetPasswordContainer from './ResetPasswordContainer'
import ResetPasswordEmailContainer from './RequestResetEmailContainer'

const ResetPasswordRouter = ({ match }) =>
  <Switch>
    <Route exact path={match.url} component={ResetPasswordEmailContainer} />
    <Route path={`${match.url}/:tokenString`} component={ResetPasswordContainer} />
    <Route component={NotFound} />
  </Switch>

export default withRouter(ResetPasswordRouter)
