import React from 'react'
import { withRouter, Switch, Route, BrowserRouter } from 'react-router-dom'
import BuyerDashboardHeader from 'marketplace/components/BuyerDashboard/BuyerDashboardHeader'
import BuyerDashboardMyBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardMyBriefs'
import BuyerDashboardTeamBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardTeamBriefs'
import BuyerDashboardTeamOverview from 'marketplace/components/BuyerDashboard/BuyerDashboardTeamOverview'
import { rootPath } from 'marketplace/routes'

const BuyerDashboardPage = props =>
  <BrowserRouter basename={`${rootPath}/buyer-dashboard`}>
    <div>
      <BuyerDashboardHeader {...props} />
      <article role="main">
        <Switch>
          <Route exact path="/" render={() => <BuyerDashboardMyBriefs {...props} />} />
          <Route exact path="/team-briefs" render={() => <BuyerDashboardTeamBriefs {...props} />} />
          <Route exact path="/team-overview" render={() => <BuyerDashboardTeamOverview {...props} />} />
        </Switch>
      </article>
    </div>
  </BrowserRouter>

export default withRouter(BuyerDashboardPage)
