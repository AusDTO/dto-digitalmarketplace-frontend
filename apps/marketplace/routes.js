import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from 'marketplace/MarketplaceAuthenticatedRoute'
import SignupPage from './pages/SignupPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import CreateUserPage from './pages/CreateUserPage'
import BriefPage from './pages/BriefPage'
import LoginPage from './pages/LoginPage'
import NotFound from './components/NotFound'
import CollaboratePage from './pages/CollaboratePage'
import SellerDashboardPage from './pages/SellerDashboardPage'
import BuyerDashboardPage from './pages/BuyerDashboardPage'
import BriefChoicePage from './pages/BriefChoicePage'
import BriefAssessorsPage from './pages/BriefAssessorsPage'
import BriefOverviewPage from './pages/BriefOverviewPage'
import OpportunitiesPage from './pages/OpportunitiesPage'
import BuyerRFQCreatePage from './pages/BuyerRFQCreatePage'
import BuyerRFQFlowPage from './pages/BuyerRFQFlowPage'
import BuyerRFQOverviewPage from './pages/BuyerRFQOverviewPage'
import BriefOutcomeChoicePage from './pages/BriefOutcomeChoicePage'

export const rootPath = '/2'

export const Routes = () => (
  <Switch>
    <Route exact path={rootPath} component={SignupPage} />
    <Route path={`${rootPath}/signup`} component={SignupPage} />
    <Route path={`${rootPath}/create-user`} component={CreateUserPage} />
    <PrivateRoute path={`${rootPath}/brief/:briefId/overview/rfq`} component={BuyerRFQOverviewPage} />
    <PrivateRoute path={`${rootPath}/brief/:briefId/overview`} component={BriefOverviewPage} />
    <PrivateRoute path={`${rootPath}/brief/:briefId/assessors`} component={BriefAssessorsPage} />
    <PrivateRoute path={`${rootPath}/brief/:briefId`} component={BriefPage} />
    <Route path={`${rootPath}/reset-password`} component={ResetPasswordPage} />
    <Route path={`${rootPath}/login`} component={LoginPage} />
    <Route path={`${rootPath}/collaborate/funded/:state`} component={CollaboratePage} />
    <Route path={`${rootPath}/collaborate/:stage`} component={CollaboratePage} />
    <Route path={`${rootPath}/collaborate`} component={CollaboratePage} />
    <Route path={`${rootPath}/seller-dashboard`} component={SellerDashboardPage} />
    <Route path={`${rootPath}/opportunities`} component={OpportunitiesPage} />
    <PrivateRoute path={`${rootPath}/buyer-dashboard`} component={BuyerDashboardPage} />
    <PrivateRoute path={`${rootPath}/create-brief`} component={BriefChoicePage} />
    <PrivateRoute path={`${rootPath}/buyer-rfq/create`} component={BuyerRFQCreatePage} />
    <PrivateRoute path={`${rootPath}/buyer-rfq/:briefId/:stage?`} component={BuyerRFQFlowPage} />
    <PrivateRoute path={`${rootPath}/outcome-choice`} component={BriefOutcomeChoicePage} />
    <Route component={NotFound} />
  </Switch>
)

const RootContainer = withRouter(Routes)

export default RootContainer
