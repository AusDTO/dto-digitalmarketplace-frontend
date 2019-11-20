import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { closeOpportunity, loadBrief } from 'marketplace/actions/briefActions'
import { setErrorMessage } from 'marketplace/actions/appActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import CloseOpportunity from 'marketplace/components/Brief/CloseOpportunity'
import { canCloseOpportunity, mapLot } from 'marketplace/components/helpers'

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

  render = () => {
    const { brief, briefResponses, errorMessage } = this.props

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

    const canClose = canCloseOpportunity(brief, briefResponses)

    if (!canClose) {
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

    if (canClose) {
      return <CloseOpportunity brief={brief} onCloseOpportunity={this.handleCloseOpportunity} />
    }

    return null
  }
}

const mapStateToProps = state => ({
  brief: state.brief.brief,
  briefResponses: state.brief.briefResponses,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  closeOpportunity: briefId => dispatch(closeOpportunity(briefId)),
  loadData: briefId => dispatch(loadBrief(briefId)),
  setError: message => dispatch(setErrorMessage(message))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CloseOpportunityPage)
)
