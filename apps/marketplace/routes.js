import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from 'marketplace/MarketplaceAuthenticatedRoute'
import SignupPage from './pages/SignupPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import CreateTeamPage from './pages/Teams/CreateTeamPage'
import CreateUserPage from './pages/CreateUserPage'
import SendInvitePage from './pages/SendInvitePage'
import BriefPage from './pages/BriefPage'
import BriefResponseCreatePage from './pages/BriefResponseCreatePage'
import BriefResponsePage from './pages/BriefResponsePage'
import BriefResponsesPage from './pages/BriefResponsesPage'
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
import BuyerTrainingCreatePage from './pages/BuyerTrainingCreatePage'
import BuyerTrainingCompletedPage from './pages/BuyerTrainingCompletedPage'
import BuyerTrainingFlowPage from './pages/BuyerTrainingFlowPage'
import BuyerBriefOverviewPage from './pages/BuyerBriefOverviewPage'
import BuyerATMCreatePage from './pages/BuyerATMCreatePage'
import BuyerATMCompletedPage from './pages/BuyerATMCompletedPage'
import BuyerATMFlowPage from './pages/BuyerATMFlowPage'
import BuyerSpecialistCreatePage from './pages/BuyerSpecialistCreatePage'
import BuyerSpecialistCompletedPage from './pages/BuyerSpecialistCompletedPage'
import BuyerSpecialistFlowPage from './pages/BuyerSpecialistFlowPage'
import BriefOutcomeChoicePage from './pages/BriefOutcomeChoicePage'
import EditTeamFlowPage from './pages/Teams/EditTeamFlowPage'
import OpportunityPage from './pages/OpportunityPage'
import CreateTeamFlowPage from './pages/Teams/CreateTeamFlowPage'
import SellerAssessmentFlowPage from './pages/SellerAssessmentFlowPage'
import SellerAssessmentCreatePage from './pages/SellerAssessmentCreatePage'
import SellerAssessmentCompletedPage from './pages/SellerAssessmentCompletedPage'
import SellerAssessmentFeedbackPage from './pages/SellerAssessmentFeedbackPage'
import TeamsPage from './pages/Teams/TeamsPage'
import SellerEditFlowPage from './pages/SellerEditFlowPage'
import BuyerAwardSellerPage from './pages/BuyerAwardSellerPage'
import AskQuestionPage from './pages/AskQuestionPage'
import QuestionPage from './pages/QuestionPage'
import PublishAnswerPage from './pages/PublishAnswerPage'
import RequestAccessPage from './pages/RequestAccessPage'
import DownloadReports from './pages/DownloadReports/DownloadReports'
import InsightPage from './pages/InsightPage'
import InvitedSellersPage from './pages/InvitedSellersPage'

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
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/brief/:briefId/questions`} component={QuestionPage} />
    <PrivateRoute
      restrictedTo="buyer"
      path={`${rootPath}/brief/:briefId/publish-answer/:questionId?`}
      component={PublishAnswerPage}
    />
    <PrivateRoute
      restrictedTo="supplier"
      path={`${rootPath}/brief/:briefId/ask-a-question`}
      component={AskQuestionPage}
    />
    <PrivateRoute
      restrictedTo="supplier"
      path={`${rootPath}/brief/:briefId/responses`}
      component={BriefResponsesPage}
    />
    <PrivateRoute
      restrictedTo="supplier"
      path={`${rootPath}/brief/:briefId/:briefResponseType/respond/:briefResponseId`}
      component={BriefResponsePage}
    />
    <PrivateRoute
      restrictedTo="supplier"
      path={`${rootPath}/brief/:briefId/:briefResponseType/respond`}
      component={BriefResponseCreatePage}
    />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/brief/:briefId/invited`} component={InvitedSellersPage} />
    <PrivateRoute path={`${rootPath}/brief/:briefId`} component={BriefPage} />
    <Route path={`${rootPath}/reset-password`} component={ResetPasswordPage} />
    <Route path={`${rootPath}/login`} component={LoginPage} />
    <Route path={`${rootPath}/insights`} component={InsightPage} />
    <Route path={`${rootPath}/seller-dashboard`} component={SellerDashboardPage} />
    <PrivateRoute
      restrictedTo="supplier"
      path={`${rootPath}/seller-edit/:supplierCode`}
      component={SellerEditFlowPage}
    />
    <Route path={`${rootPath}/:framework/opportunities/:briefId`} component={OpportunityPage} />
    <Route path={`${rootPath}/opportunities`} component={OpportunitiesPage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/buyer-dashboard`} component={BuyerDashboardPage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/buyer-rfx/create`} component={BuyerRFXCreatePage} />
    <PrivateRoute
      restrictedTo="buyer"
      path={`${rootPath}/buyer-training2/create`}
      component={BuyerTrainingCreatePage}
    />
    <PrivateRoute
      restrictedTo="buyer"
      path={`${rootPath}/buyer-rfx/:briefId/completed`}
      component={BuyerRFXCompletedPage}
    />
    <PrivateRoute
      restrictedTo="buyer"
      path={`${rootPath}/buyer-training2/:briefId/completed`}
      component={BuyerTrainingCompletedPage}
    />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/buyer-award/:briefId`} component={BuyerAwardSellerPage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/buyer-rfx/:briefId/:stage?`} component={BuyerRFXFlowPage} />
    <PrivateRoute
      restrictedTo="buyer"
      path={`${rootPath}/buyer-training2/:briefId/:stage?`}
      component={BuyerTrainingFlowPage}
    />
    <PrivateRoute
      restrictedTo="buyer"
      path={`${rootPath}/buyer-atm/:briefId/completed`}
      component={BuyerATMCompletedPage}
    />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/buyer-atm/create`} component={BuyerATMCreatePage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/buyer-atm/:briefId/:stage?`} component={BuyerATMFlowPage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/(teams|people)`} component={TeamsPage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/team/create`} component={CreateTeamPage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/team/edit/:teamId/:stage?`} component={EditTeamFlowPage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/team/:teamId/:stage?`} component={CreateTeamFlowPage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/download-reports`} component={DownloadReports} />
    <PrivateRoute
      restrictedTo="buyer"
      path={`${rootPath}/buyer-specialist/create`}
      component={BuyerSpecialistCreatePage}
    />
    <PrivateRoute
      restrictedTo="buyer"
      path={`${rootPath}/buyer-specialist/:briefId/completed`}
      component={BuyerSpecialistCompletedPage}
    />
    <PrivateRoute
      restrictedTo="buyer"
      path={`${rootPath}/buyer-specialist/:briefId/:stage?`}
      component={BuyerSpecialistFlowPage}
    />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/outcome-choice`} component={BriefOutcomeChoicePage} />
    <PrivateRoute restrictedTo="buyer" path={`${rootPath}/request-access/:permission`} component={RequestAccessPage} />
    <PrivateRoute
      restrictedTo="supplier"
      path={`${rootPath}/seller-assessment/:evidenceId/completed`}
      component={SellerAssessmentCompletedPage}
    />
    <PrivateRoute
      restrictedTo="supplier"
      path={`${rootPath}/seller-assessment/:evidenceId/feedback`}
      component={SellerAssessmentFeedbackPage}
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
