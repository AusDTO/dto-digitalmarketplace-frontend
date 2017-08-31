import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import SignupContainer from './components/SignupForm/SignupContainer'
import CreateUserPage from './pages/CreateUserPage' // eslint-disable-line import/no-named-as-default
import BriefResponse from './components/BriefResponse/BriefResponse' // eslint-disable-line import/no-named-as-default
import NotFound from './components/shared/NotFound'

export const rootPath = '/2'

export const Routes = ({ match }) =>
  <Switch>
    <Route exact path={match.url} component={SignupContainer} />
    <Route path={`${rootPath}/signup`} component={SignupContainer} />
    <Route path={`${rootPath}/createuser/:tokenstring`} component={CreateUserPage} />
    <Route path={`${rootPath}/brief/:brief_id/respond`} component={BriefResponse} />
    <Route component={NotFound} />
  </Switch>

const RootContainer = () =>
  <Switch>
    <Route path={rootPath} component={Routes} />
    <Route exact path="/signup/createuser/:tokenstring" component={CreateUserPage} />
    <Route component={NotFound} />
  </Switch>

export default withRouter(RootContainer)
