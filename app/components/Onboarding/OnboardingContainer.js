import SellerOnboarding from './SellerOnboarding'
import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import NotFound from '../shared/NotFound'
import BuyerOnboarding from './BuyerOnboarding'

const OnboardingContainer = ({ match }) =>
  <Switch>
    <Route path={`${match.url}/seller`} component={SellerOnboarding} />
    <Route path={`${match.url}/applicant`} component={SellerOnboarding} />
    <Route path={`${match.url}/buyer`} component={BuyerOnboarding} />
    <Route component={NotFound} />
  </Switch>

export default withRouter(OnboardingContainer)
