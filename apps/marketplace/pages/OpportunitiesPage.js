/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import Opportunities from 'marketplace/components/Opportunities/Opportunities'
// import { loadOpportunities } from 'marketplace/actions/opportunitiesActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class OpportunitiesPage extends Component {
  componentWillMount() {
    // this.props.loadInitialData()
  }

  render() {
    const { match, currentlySending } = this.props

    if (currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    return (
      <Switch>
        <Route exact path={match.url} render={() => <Opportunities {...this.props} />} />
      </Switch>
    )
  }
}

OpportunitiesPage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  // loadInitialData: () => dispatch(loadOpportunities())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OpportunitiesPage))
