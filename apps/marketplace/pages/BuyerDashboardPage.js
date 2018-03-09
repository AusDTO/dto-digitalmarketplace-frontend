/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import BuyerDashboard from 'marketplace/components/BuyerDashboard/BuyerDashboard'
import { loadBuyerDashboard } from 'marketplace/actions/dashboardActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class BuyerDashboardPage extends Component {
  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route path={match.url} render={() => <BuyerDashboard {...this.props} />} />
      </Switch>
    )
  }
}

BuyerDashboardPage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  loadSuccess: state.brief.loadBuyerDashboardSuccess
})

export default withRouter(connect(mapStateToProps)(BuyerDashboardPage))
