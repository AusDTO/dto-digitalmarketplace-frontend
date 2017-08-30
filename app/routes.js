import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import CreateUserPage from './pages/CreateUserPage'
import BriefResponse from './components/BriefResponse/BriefResponse'
import ResetPasswordRouter from './components/ResetPassword/ResetPasswordRoutes'
import NotFound from './components/shared/NotFound'

const RootContainer = () =>
  <Switch>
    <Route path={rootPath} component={Routes} />
    <Route exact path="/signup/createuser/:tokenstring" component={CreateUserPage} />
    <Route component={NotFound} />
  </Switch>

export default withRouter(RootContainer)

export const Routes = () =>
  <Switch>
    <Route exact path={rootPath} component={SignupPage} />
    <Route path={`${rootPath}/signup`} component={SignupPage} />
    <Route path={`${rootPath}/createuser/:tokenstring`} component={CreateUserPage} />
    <Route path={`${rootPath}/brief/:brief_id/respond`} component={BriefResponse} />
    <Route path={`${rootPath}/reset-password`} component={ResetPasswordRouter} />
    <Route component={NotFound} />
  </Switch>

export const rootPath = '/2'
