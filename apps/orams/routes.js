import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from 'orams/OramsAuthenticatedRoute'
import HomePage from 'orams/pages/HomePage'
import LoginPage from 'orams/pages/LoginPage'
import LogoutPage from 'orams/pages/LogoutPage'
import EditProfilePage from 'orams/pages/EditProfilePage'
import SellerCataloguePage from 'orams/pages/SellerCataloguePage'
import SellerProfilePage from 'orams/pages/SellerProfilePage'
import ProfilePage from 'orams/pages/ProfilePage'
import NotFound from 'shared/NotFound'
import ResetPasswordPage from 'orams/pages/ResetPasswordPage'
import PriceHistoryPage from 'orams/pages/PriceHistoryPage'
import TermsPage from 'orams/pages/TermsPage'
import PrivacyPolicyPage from 'orams/pages/PrivacyPolicyPage'
import SecurityPage from 'orams/pages/SecurityPage'
import DisclaimerPage from 'orams/pages/DisclaimerPage'
import CopyrightPage from 'orams/pages/CopyrightPage'
import SignupPage from 'orams/pages/SignupPage'
import InvitationPage from 'orams/pages/InvitationPage'
import CreatePasswordPage from 'orams/pages/CreatePasswordPage'

export const rootPath = '/orams'

export const Routes = () =>
  <Switch>
    <Route exact path={rootPath} component={HomePage} />
    <Route path={`${rootPath}/signup`} component={SignupPage} />
    <Route path={`${rootPath}/login`} component={LoginPage} />
    <Route path={`${rootPath}/logout`} component={LogoutPage} />
    <PrivateRoute path={`${rootPath}/edit-profile`} component={EditProfilePage} />
    <PrivateRoute path={`${rootPath}/seller-catalogue`} component={SellerCataloguePage} />
    <PrivateRoute path={`${rootPath}/seller-profile/:id`} component={SellerProfilePage} />
    <PrivateRoute path={`${rootPath}/price-history`} component={PriceHistoryPage} />
    <PrivateRoute path={`${rootPath}/profile`} component={ProfilePage} />
    <Route path={`${rootPath}/reset-password`} component={ResetPasswordPage} />
    <Route path={`${rootPath}/terms-of-use`} component={TermsPage} />
    <Route path={`${rootPath}/privacy-policy`} component={PrivacyPolicyPage} />
    <Route path={`${rootPath}/security`} component={SecurityPage} />
    <Route path={`${rootPath}/disclaimer`} component={DisclaimerPage} />
    <Route path={`${rootPath}/copyright`} component={CopyrightPage} />
    <Route path={`${rootPath}/send-invite/:token`} component={InvitationPage} />
    <Route path={`${rootPath}/create-user/:token`} component={CreatePasswordPage} />
    <Route component={NotFound} />
  </Switch>

const RootContainer = withRouter(Routes)

export default RootContainer
