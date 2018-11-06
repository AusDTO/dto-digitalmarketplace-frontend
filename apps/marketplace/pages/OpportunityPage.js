import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPublicBrief } from 'marketplace/actions/briefActions'
import Opportunity from 'marketplace/components/Opportunity/Opportunity'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
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

    if (!this.props.loadBriefSuccess) {
      let hasFocused = false
      const setFocus = e => {
        if (!hasFocused) {
          hasFocused = true
          e.focus()
        }
      }
      return (
        <ErrorBoxComponent
          title="A problem occurred when loading the brief details"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (this.props.brief && this.props.brief.title) {
      return (
        <Opportunity
          brief={this.props.brief}
          briefResponseCount={this.props.briefResponseCount}
          invitedSellerCount={this.props.invitedSellerCount}
        />
      )
    }

    return null
  }
}

const mapResetStateToProps = state => ({
  brief: state.brief.brief,
  briefResponseCount: state.brief.briefResponseCount,
  invitedSellerCount: state.brief.invitedSellerCount,
  loadBriefSuccess: state.brief.loadBriefSuccess,
  errorMessage: state.app.errorMessage,
  currentlySending: state.app.currentlySending
})

const mapResetDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadPublicBrief(briefId))
})

export default connect(mapResetStateToProps, mapResetDispatchToProps)(OpportunityPage)
