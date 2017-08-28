import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import SignupContainer from './components/SignupForm/SignupContainer'
import CreateUserContainer from './containers/CreateUserContainer'
import BriefResponse from './components/BriefResponse/BriefResponse'
import NotFound from './components/shared/NotFound'

const RootContainer = () =>
  <Switch>
    <Route path={rootPath} component={Routes} />
    <Route exact path="/signup/createuser/:tokenstring" component={CreateUserContainer} />
    <Route component={NotFound} />
  </Switch>

export default withRouter(RootContainer)

export const Routes = ({ match }) =>
  <Switch>
    <Route exact path={match.url} component={SignupContainer} />
    <Route path={`${rootPath}/signup`} component={SignupContainer} />
    <Route path={`${rootPath}/createuser/:tokenstring`} component={CreateUserContainer} />
    <Route path={`${rootPath}/brief/:brief_id/respond`} component={BriefResponse} />
    <Route component={NotFound} />
  </Switch>

export const rootPath = '/2'
