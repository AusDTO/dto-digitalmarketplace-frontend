import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'

import PrivateRoute from 'shared/PrivateRoute'

import SignupPage from './pages/SignupPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import CreateUserPage from './pages/CreateUserPage'
import BriefPage from './pages/BriefPage'
import LoginPage from './pages/LoginPage'
import NotFound from './components/shared/NotFound'

export const rootPath = '/2'

export const Routes = () =>
  <Switch>
    <Route exact path={rootPath} component={SignupPage} />
    <Route path={`${rootPath}/signup`} component={SignupPage} />
    <Route path={`${rootPath}/create-user`} component={CreateUserPage} />
    <PrivateRoute path={`${rootPath}/brief/:briefId`} component={BriefPage} />
    <PrivateRoute path={`${rootPath}/reset-password`} component={ResetPasswordPage} />
    <Route path={`${rootPath}/login`} component={LoginPage} />
    <Route component={NotFound} />
  </Switch>

const RootContainer = withRouter(Routes)

export default RootContainer
