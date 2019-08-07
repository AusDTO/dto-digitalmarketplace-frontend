import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, BrowserRouter } from 'react-router-dom'
import BuyerDashboardHeader from 'marketplace/components/BuyerDashboard/BuyerDashboardHeader'
import BuyerDashboardAllBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardAllBriefs'
import BuyerDashboardDraftBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardDraftBriefs'
import BuyerDashboardLiveBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardLiveBriefs'
import BuyerDashboardClosedBriefs from 'marketplace/components/BuyerDashboard/BuyerDashboardClosedBriefs'
import { rootPath } from 'marketplace/routes'

export class BuyerDashboardPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      briefCounts: {
        closed: 0,
        draft: 0,
        live: 0,
        withdrawn: 0
      }
    }
  }

  dashboardLoaded(data) {
    this.setState({
      briefCounts: data.briefCount,
      organisation: data.organisation
    })
  }

  render() {
    const props = this.props
    return (
      <BrowserRouter basename={`${rootPath}/buyer-dashboard`}>
        <div>
          <BuyerDashboardHeader
            {...props}
            briefCounts={this.state.briefCounts}
            organisation={this.state.organisation}
          />
          <article role="main">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <BuyerDashboardAllBriefs {...props} dashboardLoaded={data => this.dashboardLoaded(data)} />
                )}
              />
              <Route
                path="/draft-briefs"
                render={() => (
                  <BuyerDashboardDraftBriefs {...props} dashboardLoaded={data => this.dashboardLoaded(data)} />
                )}
              />
              <Route
                path="/live-briefs"
                render={() => (
                  <BuyerDashboardLiveBriefs {...props} dashboardLoaded={data => this.dashboardLoaded(data)} />
                )}
              />
              <Route
                path="/closed-briefs"
                render={() => (
                  <BuyerDashboardClosedBriefs {...props} dashboardLoaded={data => this.dashboardLoaded(data)} />
                )}
              />
            </Switch>
          </article>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  organisation: state.dashboard.buyerDashboardOrganisation
})

export default withRouter(connect(mapStateToProps)(BuyerDashboardPage))
