import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, BrowserRouter } from 'react-router-dom'
import BuyerDashboardHeader from 'marketplace/components/BuyerDashboard/BuyerDashboardHeader'
import BuyerDashboardMyBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardMyBriefs'
import BuyerDashboardTeamBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardTeamBriefs'
import BuyerDashboardTeamOverview from 'marketplace/components/BuyerDashboard/BuyerDashboardTeamOverview'
import BuyerDashboardAllBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardAllBriefs'
import BuyerDashboardDraftBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardDraftBriefs'
import BuyerDashboardLiveBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardLiveBriefs'
import BuyerDashboardClosedBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardClosedBriefs'
import { rootPath } from 'marketplace/routes'

const BuyerDashboardPage = props => (
  <BrowserRouter basename={`${rootPath}/buyer-dashboard`}>
    <div>
      <BuyerDashboardHeader {...props} />
      <article role="main">
        <Switch>
          <Route exact path="/" render={() => <BuyerDashboardMyBriefs {...props} />} />
          <Route path="/team-briefs" render={() => <BuyerDashboardTeamBriefs {...props} />} />
          <Route path="/team-overview" render={() => <BuyerDashboardTeamOverview {...props} />} />
          <Route path="/all-briefs" render={() => <BuyerDashboardAllBriefs {...props} />} />
          <Route path="/draft-briefs" render={() => <BuyerDashboardDraftBriefs {...props} />} />
          <Route path="/live-briefs" render={() => <BuyerDashboardLiveBriefs {...props} />} />
          <Route path="/closed-briefs" render={() => <BuyerDashboardClosedBriefs {...props} />} />
        </Switch>
      </article>
    </div>
  </BrowserRouter>
)

const mapStateToProps = state => ({
  organisation: state.dashboard.buyerDashboardOrganisation
})

export default withRouter(connect(mapStateToProps)(BuyerDashboardPage))
