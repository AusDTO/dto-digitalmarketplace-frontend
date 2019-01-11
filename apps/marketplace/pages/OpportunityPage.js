import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { loadPublicBrief } from 'marketplace/actions/briefActions'
import Opportunity from 'marketplace/components/Opportunity/Opportunity'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import { rootPath } from 'marketplace/routes'
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
    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    if (this.props.errorMessage) {
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

    // only RFX can be displayed using this opportunity view
    if (this.props.brief && this.props.brief.lot && this.props.brief.lot !== 'rfx') {
      window.location = `/digital-marketplace/opportunities/${this.props.brief.id}`
      return null
    }

    // if the auth value is in the query string and the user is not authenticated, redirect to login
    if (/auth=1/.test(this.props.location.search) && !this.props.loggedIn) {
      return (
        <Redirect
          to={{
            pathname: `${rootPath}/login`,
            state: { from: this.props.location.pathname }
          }}
        />
      )
    }

    if (this.props.brief && this.props.brief.id) {
      return (
        <Opportunity
          brief={this.props.brief}
          domains={this.props.domains}
          briefResponseCount={this.props.briefResponseCount}
          invitedSellerCount={this.props.invitedSellerCount}
          isInvitedSeller={this.props.isInvitedSeller}
          isBriefOwner={this.props.isBriefOwner}
          isBuyer={this.props.isBuyer}
          hasResponded={this.props.hasResponded}
          loggedIn={this.props.loggedIn}
        />
      )
    }

    return null
  }
}

const mapResetStateToProps = state => ({
  brief: state.brief.brief,
  domains: state.brief.domains,
  briefResponseCount: state.brief.briefResponseCount,
  invitedSellerCount: state.brief.invitedSellerCount,
  loadBriefSuccess: state.brief.loadBriefSuccess,
  isInvitedSeller: state.brief.isInvitedSeller,
  isBriefOwner: state.brief.isBriefOwner,
  isBuyer: state.brief.isBuyer,
  hasResponded: state.brief.hasResponded,
  errorMessage: state.app.errorMessage,
  loggedIn: state.app.loggedIn
})

const mapResetDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadPublicBrief(briefId))
})

export default withRouter(
  connect(
    mapResetStateToProps,
    mapResetDispatchToProps
  )(OpportunityPage)
)
