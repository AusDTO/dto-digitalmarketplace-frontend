import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Switch, Route } from 'react-router-dom'
import NotFound from '../shared/NotFound'
import BuyerOnboarding from './BuyerOnboarding'
import SellerOnboarding from './SellerOnboarding'

const OnboardingContainer = props => {
  const { match } = props
  return (
    <Switch>
      <Route path={`${match.url}/seller`} component={SellerOnboarding} />
      <Route path={`${match.url}/applicant`} component={SellerOnboarding} />
      <Route path={`${match.url}/buyer`} component={BuyerOnboarding} />
      <Route component={NotFound} />
    </Switch>
  )
}

OnboardingContainer.PropTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(OnboardingContainer)
