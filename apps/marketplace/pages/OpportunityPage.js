import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBrief } from 'marketplace/actions/briefActions'
import Opportunity from 'marketplace/components/Opportunity/Opportunity'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class OpportunityPage extends Component {
  componentWillMount() {
    const briefId = this.props.match.params.briefId
    if (briefId.length > 0) {
      this.props.loadInitialData(briefId)
    }
  }

  render() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.brief && this.props.brief.title) {
      return <Opportunity brief={this.props.brief} />
    }

    return null
  }
}

const mapResetStateToProps = state => ({
  brief: state.brief.brief,
  briefResponses: state.brief.briefResponses,
  loadBriefSuccess: state.brief.loadBriefSuccess,
  currentlySending: state.app.currentlySending
})

const mapResetDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadBrief(briefId))
})

export default connect(mapResetStateToProps, mapResetDispatchToProps)(OpportunityPage)
