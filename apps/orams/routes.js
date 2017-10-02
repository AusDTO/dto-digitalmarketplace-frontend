import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from 'orams/OramsAuthenticatedRoute'
import HomePage from 'orams/pages/HomePage'
import LoginPage from 'orams/pages/LoginPage'
import LogoutPage from 'orams/pages/LogoutPage'
import EditProfilePage from 'orams/pages/EditProfilePage'
import NotFound from 'shared/NotFound'
import ResetPasswordPage from 'orams/pages/ResetPasswordPage'

export const rootPath = '/orams'

export const Routes = () =>
  <Switch>
    <Route exact path={rootPath} component={HomePage} />
    <Route path={`${rootPath}/login`} component={LoginPage} />
    <Route path={`${rootPath}/logout`} component={LogoutPage} />
    <PrivateRoute path={`${rootPath}/edit-profile`} component={EditProfilePage} />
    <Route path={`${rootPath}/reset-password`} component={ResetPasswordPage} />
    <Route component={NotFound} />
  </Switch>

const RootContainer = withRouter(Routes)

export default RootContainer
