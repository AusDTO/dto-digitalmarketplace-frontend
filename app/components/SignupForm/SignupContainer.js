import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import SignupForm from './SignupForm'
import UserOnboardingContainer from '../Onboarding/OnboardingContainer'
import CreateUserPage from '../../pages/CreateUserPage'
import NotFound from '../shared/NotFound'

const Routes = ({ match }) =>
  <Switch>
    <Route exact path={match.url} component={SignupForm} />
    <Route path={`${match.url}/createuser/:token`} component={CreateUserPage} />
    <Route path={`${match.url}/success`} component={UserOnboardingContainer} />
    <Route component={NotFound} />
  </Switch>

export default withRouter(Routes)
