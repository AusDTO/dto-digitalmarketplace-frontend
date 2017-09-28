import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import HomePage from 'orams/pages/HomePage'
import LoginPage from 'orams/pages/LoginPage'
import LogoutPage from 'orams/pages/LogoutPage'
import EditProfilePage from 'orams/pages/EditProfilePage'
import NotFound from 'shared/NotFound'
import PrivateRoute from 'shared/PrivateRoute'
import ResetPasswordPage from 'orams/pages/ResetPasswordPage'

export const rootPath = '/orams'

export const Routes = () =>
  <Switch>
    <Route exact path={rootPath} component={HomePage} />
    <Route path={`${rootPath}/login`} component={LoginPage} />
    <Route path={`${rootPath}/logout`} component={LogoutPage} />
    <Route path={`${rootPath}/reset-password`} component={ResetPasswordPage} />
    <PrivateRoute path={`${rootPath}/edit-profile`} component={EditProfilePage} customRedirectPath="/orams/login" />
    <Route component={NotFound} />
  </Switch>

const RootContainer = withRouter(Routes)

export default RootContainer
