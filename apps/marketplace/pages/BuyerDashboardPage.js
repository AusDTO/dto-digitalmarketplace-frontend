/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import BuyerDashboardHeader from 'marketplace/components/BuyerDashboard/BuyerDashboardHeader'
import BuyerDashboardMyBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardMyBriefs'
import BuyerDashboardTeamBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardTeamBriefs'
import BuyerDashboardTeamOverview from 'marketplace/components/BuyerDashboard/BuyerDashboardTeamOverview'

class BuyerDashboardPage extends Component {
  render() {
    const { match } = this.props

    return (
      <div>
        <BuyerDashboardHeader {...this.props} />
        <article role="main">
          <Switch>
            <Route exact path={match.url} render={() => <BuyerDashboardMyBriefs {...this.props} />} />
            <Route exact path={`${match.url}/team-briefs`} render={() => <BuyerDashboardTeamBriefs {...this.props} />} />
            <Route
              exact
              path={`${match.url}/team-overview`}
              render={() => <BuyerDashboardTeamOverview {...this.props} />}
            />
          </Switch>
        </article>
      </div>
    )
  }
}

BuyerDashboardPage.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(connect()(BuyerDashboardPage))
