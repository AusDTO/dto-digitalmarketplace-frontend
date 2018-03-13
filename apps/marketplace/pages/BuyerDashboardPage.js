import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Switch, Route } from 'react-router-dom'
import BuyerDashboardHeader from 'marketplace/components/BuyerDashboard/BuyerDashboardHeader'
import BuyerDashboardMyBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardMyBriefs'
import BuyerDashboardTeamBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardTeamBriefs'
import BuyerDashboardTeamOverview from 'marketplace/components/BuyerDashboard/BuyerDashboardTeamOverview'

const BuyerDashboardPage = props => {
  const { match } = props

  return (
    <div>
      <BuyerDashboardHeader {...props} />
      <article role="main">
        <Switch>
          <Route exact path={match.url} render={() => <BuyerDashboardMyBriefs {...props} />} />
          <Route exact path={`${match.url}/team-briefs`} render={() => <BuyerDashboardTeamBriefs {...props} />} />
          <Route exact path={`${match.url}/team-overview`} render={() => <BuyerDashboardTeamOverview {...props} />} />
        </Switch>
      </article>
    </div>
  )
}

BuyerDashboardPage.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(BuyerDashboardPage)
