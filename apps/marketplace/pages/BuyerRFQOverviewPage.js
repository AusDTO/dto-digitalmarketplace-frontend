import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBrief } from 'marketplace/actions/briefActions'
import BuyerRFQOverview from 'marketplace/components/BuyerRFQ/BuyerRFQOverview'

class BuyerRFQOverviewPage extends Component {
  componentDidMount() {
    this.props.loadData(this.props.match.params.briefId)
  }

  render() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    return <BuyerRFQOverview brief={this.props.brief} />
  }
}

const mapStateToProps = state => ({
  currentlySending: state.app.currentlySending,
  brief: state.brief.brief
})

const mapDispatchToProps = dispatch => ({
  loadData: briefId => dispatch(loadBrief(briefId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuyerRFQOverviewPage))
