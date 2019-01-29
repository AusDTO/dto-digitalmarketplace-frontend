import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, BrowserRouter } from 'react-router-dom'
import SellerDashboardHeader from 'marketplace/components/SellerDashboard/SellerDashboardHeader'
import Messages from 'marketplace/components/SellerDashboard/Messages'
import Team from 'marketplace/components/SellerDashboard/Team'
import { loadSellerDashboard } from 'marketplace/actions/dashboardActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { rootPath } from 'marketplace/routes'

class SellerDashboardPage extends Component {
  componentWillMount() {
    this.props.loadInitialData()
  }

  render() {
    const { match, currentlySending } = this.props

    if (currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    return (
      <BrowserRouter basename={`${rootPath}/seller-dashboard`}>
        <div>
          <SellerDashboardHeader {...this.props} />
          <Switch>
            <Route exact path={match.url} render={() => <Messages {...this.props} />} />
            <Route path="/team" render={() => <Team {...this.props} />} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

SellerDashboardPage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  items: state.dashboard.sellerDashboard.items,
  loadSuccess: state.brief.loadSellerDashboardSuccess,
  currentlySending: state.app.currentlySending,
  supplier: state.dashboard.sellerDashboard.supplier
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: () => dispatch(loadSellerDashboard())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellerDashboardPage))
