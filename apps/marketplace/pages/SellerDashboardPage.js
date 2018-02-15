import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import SellerDashboard from 'marketplace/components/SellerDashboard/SellerDashboard'
import { loadSellerDashboard } from 'marketplace/actions/dashboardActions'

class SellerDashboardPage extends Component {
  componentWillMount() {
    this.props.loadInitialData()
  }

  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={match.url} render={() => <SellerDashboard {...this.props} />} />
      </Switch>
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
