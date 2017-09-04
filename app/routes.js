import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import SignupContainer from './components/SignupForm/SignupContainer'
import ResetPasswordPage from './pages/ResetPasswordPage'
import CreateUserPage from './pages/CreateUserPage'
import BriefResponse from './components/BriefResponse/BriefResponse'
import NotFound from './components/shared/NotFound'

export const rootPath = '/2'

export const Routes = () =>
  <Switch>
    <Route exact path={rootPath} component={SignupContainer} />
    <Route path={`${rootPath}/signup`} component={SignupContainer} />
    <Route path={`${rootPath}/create-user`} component={CreateUserPage} />
    <Route path={`${rootPath}/brief/:brief_id/respond`} component={BriefResponse} />
    <Route path={`${rootPath}/reset-password`} component={ResetPasswordPage} />
    <Route component={NotFound} />
  </Switch>

const RootContainer = withRouter(Routes)

export default RootContainer
