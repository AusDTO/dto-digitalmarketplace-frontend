import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { closeOpportunity, loadBrief } from 'marketplace/actions/briefActions'
import { handleFeedbackSubmit, setErrorMessage } from 'marketplace/actions/appActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import CloseOpportunity from 'marketplace/components/Brief/CloseOpportunity'
import ClosedOpportunity from 'marketplace/components/Brief/ClosedOpportunity'
import { mapLot } from 'marketplace/components/helpers'

class CloseOpportunityPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      opportunityClosed: false
    }
  }

  componentDidMount = () => {
    if (this.props.match.params.briefId) {
      this.getBriefData()
    }
  }

  getBriefData = () => {
    this.setState({
      loading: true
    })

    this.props.loadData(this.props.match.params.briefId).then(response => {
      if (response.status === 200) {
        this.setState({
          loading: false
        })
      }
    })
  }

  handleCloseOpportunity = () => {
    this.setState({
      loading: true
    })

    this.props.closeOpportunity(this.props.match.params.briefId).then(response => {
      if (response.status === 200) {
        this.setState({
          loading: false,
          opportunityClosed: true
        })
      }
    })
  }

  handleFeedbackSubmit = values => {
    const { app, brief } = this.props

    this.props.handleFeedbackSubmit({
      object_id: brief.id,
      object_type: 'Brief',
      userType: app.userType,
      ...values
    })
  }

  render = () => {
    const { app, brief, canCloseOpportunity, errorMessage } = this.props

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    if (errorMessage) {
      hasFocused = false
      return (
        <ErrorBoxComponent
          title="A problem occurred when loading the brief details"
          errorMessage={errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (brief.status !== 'live') {
      return (
        <ErrorBoxComponent
          title={`Unable to close opportunity`}
          errorMessage={`A ${brief.status} opportunity can not be closed`}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (this.state.opportunityClosed) {
      return (
        <ClosedOpportunity app={app} brief={brief} onFeedbackSubmit={this.handleFeedbackSubmit} setFocus={setFocus} />
      )
    }

    if (!canCloseOpportunity) {
      hasFocused = false
      return (
        <ErrorBoxComponent
          title={`Unable to close ${brief.lot ? mapLot(brief.lot).toLowerCase() : ''} opportunity`}
          errorMessage="An opportunity can only be closed early if one seller has been invited and that seller has submitted a response"
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (canCloseOpportunity) {
      return <CloseOpportunity brief={brief} onCloseOpportunity={this.handleCloseOpportunity} />
    }

    return null
  }
}

const mapStateToProps = state => ({
  app: state.app,
  brief: state.brief.brief,
  briefResponses: state.brief.briefResponses,
  canCloseOpportunity: state.brief.canCloseOpportunity,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  closeOpportunity: briefId => dispatch(closeOpportunity(briefId)),
  handleFeedbackSubmit: model => dispatch(handleFeedbackSubmit(model)),
  loadData: briefId => dispatch(loadBrief(briefId)),
  setError: message => dispatch(setErrorMessage(message))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CloseOpportunityPage)
)
