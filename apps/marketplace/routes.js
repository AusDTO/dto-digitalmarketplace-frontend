import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from 'marketplace/MarketplaceAuthenticatedRoute'
import SignupPage from './pages/SignupPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import CreateUserPage from './pages/CreateUserPage'
import SendInvitePage from './pages/SendInvitePage'
import BriefPage from './pages/BriefPage'
import LoginPage from './pages/LoginPage'
import NotFound from './components/NotFound'
import SellerDashboardPage from './pages/SellerDashboardPage'
import BuyerDashboardPage from './pages/BuyerDashboardPage'
import BriefAssessorsPage from './pages/BriefAssessorsPage'
import BriefOverviewPage from './pages/BriefOverviewPage'
import OpportunitiesPage from './pages/OpportunitiesPage'
import BuyerRFXCreatePage from './pages/BuyerRFXCreatePage'
import BuyerRFXCompletedPage from './pages/BuyerRFXCompletedPage'
import BuyerRFXFlowPage from './pages/BuyerRFXFlowPage'
import BuyerBriefOverviewPage from './pages/BuyerBriefOverviewPage'
import BuyerATMCreatePage from './pages/BuyerATMCreatePage'
import BuyerATMCompletedPage from './pages/BuyerATMCompletedPage'
import BuyerATMFlowPage from './pages/BuyerATMFlowPage'
import BriefOutcomeChoicePage from './pages/BriefOutcomeChoicePage'
import OpportunityPage from './pages/OpportunityPage'
import SellerAssessmentFlowPage from './pages/SellerAssessmentFlowPage'
import SellerAssessmentCreatePage from './pages/SellerAssessmentCreatePage'
import SellerAssessmentCompletedPage from './pages/SellerAssessmentCompletedPage'

export const rootPath = '/2'

export const Routes = () => (
  <Switch>
    <Route exact path={rootPath} component={SignupPage} />
    <Route path={`${rootPath}/signup`} component={SignupPage} />
    <Route path={`${rootPath}/create-user`} component={CreateUserPage} />
    <PrivateRoute restrictedTo="admin" path={`${rootPath}/send-invite/:token`} component={SendInvitePage} />
    <PrivateRoute
      restrictedTo="buyer"
      path={`${rootPath}/brief/:briefId/overview/:flow`}
      component={BuyerBriefOverviewPage}
    />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/brief/:briefId/overview`} component={BriefOverviewPage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/brief/:briefId/assessors`} component={BriefAssessorsPage} />
    <PrivateRoute path={`${rootPath}/brief/:briefId`} component={BriefPage} />
    <Route path={`${rootPath}/reset-password`} component={ResetPasswordPage} />
    <Route path={`${rootPath}/login`} component={LoginPage} />
    <Route path={`${rootPath}/seller-dashboard`} component={SellerDashboardPage} />
    <Route path={`${rootPath}/:framework/opportunities/:briefId`} component={OpportunityPage} />
    <Route path={`${rootPath}/opportunities`} component={OpportunitiesPage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/buyer-dashboard`} component={BuyerDashboardPage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/buyer-rfx/create`} component={BuyerRFXCreatePage} />
    <PrivateRoute
      restrictedTo="buyer"
      path={`${rootPath}/buyer-rfx/:briefId/completed`}
      component={BuyerRFXCompletedPage}
    />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/buyer-rfx/:briefId/:stage?`} component={BuyerRFXFlowPage} />
    <PrivateRoute
      restrictedTo="buyer"
      path={`${rootPath}/buyer-atm/:briefId/completed`}
      component={BuyerATMCompletedPage}
    />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/buyer-atm/create`} component={BuyerATMCreatePage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/buyer-atm/:briefId/:stage?`} component={BuyerATMFlowPage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/outcome-choice`} component={BriefOutcomeChoicePage} />
    <PrivateRoute
      restrictedTo="supplier"
      path={`${rootPath}/seller-assessment/:evidenceId/completed`}
      component={SellerAssessmentCompletedPage}
    />
    <PrivateRoute
      restrictedTo="supplier"
      path={`${rootPath}/seller-assessment/create/:domainId/:briefId?`}
      component={SellerAssessmentCreatePage}
    />
    <PrivateRoute
      restrictedTo="supplier"
      path={`${rootPath}/seller-assessment/:evidenceId/:stage?`}
      component={SellerAssessmentFlowPage}
    />
    <Route component={NotFound} />
  </Switch>
)

const RootContainer = withRouter(Routes)

export default RootContainer
