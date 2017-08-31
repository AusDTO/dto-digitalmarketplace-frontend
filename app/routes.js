import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import SignupContainer from './components/SignupForm/SignupContainer'
import CreateUserPage from './pages/CreateUserPage'
import BriefResponse from './components/BriefResponse/BriefResponse'
import ResetPasswordPage from './pages/ResetPasswordPage'
import NotFound from './components/shared/NotFound'

export const rootPath = '/2'

export const RootContainer = () =>
  <Switch>
    <Route exact path={rootPath} component={SignupContainer} />
    <Route path={`${rootPath}/signup`} component={SignupContainer} />
    <Route path={`${rootPath}/createuser`} component={CreateUserPage} />
    <Route path={`${rootPath}/brief/:brief_id/respond`} component={BriefResponse} />
    <Route path={`${rootPath}/reset-password`} component={ResetPasswordPage} />
    <Route component={NotFound} />
  </Switch>

export default withRouter(RootContainer)
