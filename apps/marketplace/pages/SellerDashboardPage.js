/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import SellerDashboard from 'orams/components/SellerDashboard/SellerDashboard'

class SellerDashboardPage extends Component {
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

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellerDashboardPage))
