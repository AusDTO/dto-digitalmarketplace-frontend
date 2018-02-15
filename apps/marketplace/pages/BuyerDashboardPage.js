/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import BuyerDashboard from 'marketplace/components/BuyerDashboard/BuyerDashboard'

class BuyerDashboardPage extends Component {
  render() {
    const { match } = this.props

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

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuyerDashboardPage))
