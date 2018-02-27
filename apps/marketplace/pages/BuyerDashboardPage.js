/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import BuyerDashboard from 'marketplace/components/BuyerDashboard/BuyerDashboard'
import { loadBuyerDashboard } from 'marketplace/actions/dashboardActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class BuyerDashboardPage extends Component {
  componentWillMount() {
    this.props.loadInitialData()
  }

  render() {
    const { match, currentlySending } = this.props

    if (currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    return (
      <Switch>
        <Route exact path={match.url} render={() => <BuyerDashboard {...this.props} />} />
      </Switch>
    )
  }
}

BuyerDashboardPage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  items: state.dashboard.buyerDashboard.items,
  loadSuccess: state.brief.loadBuyerDashboardSuccess,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: () => dispatch(loadBuyerDashboard())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuyerDashboardPage))
