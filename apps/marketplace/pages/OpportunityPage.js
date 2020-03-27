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

    // only RFX and ATM can be displayed using this opportunity view
    if (
      this.props.brief &&
      this.props.brief.lot &&
      !['rfx', 'training2', 'atm', 'specialist'].includes(this.props.brief.lot)
    ) {
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
          supplierBriefResponseCount={this.props.supplierBriefResponseCount}
          supplierBriefResponseCountSubmitted={this.props.supplierBriefResponseCountSubmitted}
          supplierBriefResponseCountDraft={this.props.supplierBriefResponseCountDraft}
          supplierBriefResponseId={this.props.supplierBriefResponseId}
          supplierBriefResponseIsDraft={this.props.supplierBriefResponseIsDraft}
          canRespond={this.props.canRespond}
          isAssessedForCategory={this.props.isAssessedForCategory}
          isAssessedForAnyCategory={this.props.isAssessedForAnyCategory}
          hasEvidenceInDraftForCategory={this.props.hasEvidenceInDraftForCategory}
          hasLatestEvidenceRejectedForCategory={this.props.hasLatestEvidenceRejectedForCategory}
          draftEvidenceId={this.props.draftEvidenceId}
          rejectedEvidenceId={this.props.rejectedEvidenceId}
          isOpenToCategory={this.props.isOpenToCategory}
          isOpenToAll={this.props.isOpenToAll}
          isBriefOwner={this.props.isBriefOwner}
          isBuyer={this.props.isBuyer}
          isApprovedSeller={this.props.isApprovedSeller}
          isApplicant={this.props.isApplicant}
          isRecruiterOnly={this.props.isRecruiterOnly}
          isAwaitingApplicationAssessment={this.props.isAwaitingApplicationAssessment}
          isAwaitingDomainAssessment={this.props.isAwaitingDomainAssessment}
          hasBeenAssessedForBrief={this.props.hasBeenAssessedForBrief}
          hasResponded={this.props.hasResponded}
          loggedIn={this.props.loggedIn}
          hasSupplierErrors={this.props.hasSupplierErrors}
          isInvited={this.props.isInvited}
          hasSignedCurrentAgreement={this.props.hasSignedCurrentAgreement}
          lastEditedAt={this.props.lastEditedAt}
          onlySellersEdited={this.props.onlySellersEdited}
          supplierCode={this.props.supplierCode}
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
  supplierBriefResponseCount: state.brief.supplierBriefResponseCount,
  supplierBriefResponseCountSubmitted: state.brief.supplierBriefResponseCountSubmitted,
  supplierBriefResponseCountDraft: state.brief.supplierBriefResponseCountDraft,
  supplierBriefResponseId: state.brief.supplierBriefResponseId,
  supplierBriefResponseIsDraft: state.brief.supplierBriefResponseIsDraft,
  loadBriefSuccess: state.brief.loadBriefSuccess,
  canRespond: state.brief.canRespond,
  isAssessedForCategory: state.brief.isAssessedForCategory,
  isAssessedForAnyCategory: state.brief.isAssessedForAnyCategory,
  hasEvidenceInDraftForCategory: state.brief.hasEvidenceInDraftForCategory,
  hasLatestEvidenceRejectedForCategory: state.brief.hasLatestEvidenceRejectedForCategory,
  draftEvidenceId: state.brief.draftEvidenceId,
  rejectedEvidenceId: state.brief.rejectedEvidenceId,
  isOpenToCategory: state.brief.isOpenToCategory,
  isOpenToAll: state.brief.isOpenToAll,
  isBriefOwner: state.brief.isBriefOwner,
  isBuyer: state.brief.isBuyer,
  isApprovedSeller: state.brief.isApprovedSeller,
  isApplicant: state.brief.isApplicant,
  isRecruiterOnly: state.brief.isRecruiterOnly,
  isAwaitingApplicationAssessment: state.brief.isAwaitingApplicationAssessment,
  isAwaitingDomainAssessment: state.brief.isAwaitingDomainAssessment,
  hasBeenAssessedForBrief: state.brief.hasBeenAssessedForBrief,
  hasResponded: state.brief.hasResponded,
  errorMessage: state.app.errorMessage,
  loggedIn: state.app.loggedIn,
  hasSupplierErrors: state.brief.hasSupplierErrors,
  isInvited: state.brief.isInvited,
  hasSignedCurrentAgreement: state.brief.hasSignedCurrentAgreement,
  lastEditedAt: state.brief.lastEditedAt,
  onlySellersEdited: state.brief.onlySellersEdited,
  supplierCode: state.app.supplierCode,
  userType: state.app.userType
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
