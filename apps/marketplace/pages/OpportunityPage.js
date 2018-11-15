import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPublicBrief } from 'marketplace/actions/briefActions'
import Opportunity from 'marketplace/components/Opportunity/Opportunity'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class OpportunityPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    this.setState({
      loading: true
    })
    const briefId = this.props.match.params.briefId
    if (briefId.length > 0) {
      this.props.loadInitialData(briefId).then(response => {
        if (response.status === 200) {
          this.setState({
            loading: false
          })
        }
      })
    }
  }

  render() {
    if (this.props.errorMessage) {
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

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.brief && this.props.brief.id) {
      return (
        <Opportunity
          brief={this.props.brief}
          briefResponseCount={this.props.briefResponseCount}
          invitedSellerCount={this.props.invitedSellerCount}
          isInvitedSeller={this.props.isInvitedSeller}
          isBriefOwner={this.props.isBriefOwner}
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
  isInvitedSeller: state.brief.isInvitedSeller,
  isBriefOwner: state.brief.isBriefOwner,
  errorMessage: state.app.errorMessage
})

const mapResetDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadPublicBrief(briefId))
})

export default connect(mapResetStateToProps, mapResetDispatchToProps)(OpportunityPage)
