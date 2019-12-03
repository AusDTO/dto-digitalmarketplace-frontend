import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { withdrawOpportunity, loadBrief } from 'marketplace/actions/briefActions'
import { handleFeedbackSubmit, setErrorMessage } from 'marketplace/actions/appActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import WithdrawOpportunity from 'marketplace/components/Brief/WithdrawOpportunity'
import WithdrawnOpportunity from 'marketplace/components/Brief/WithdrawnOpportunity'
import { mapLot } from 'marketplace/components/helpers'

class WithdrawOpportunityPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      opportunityWithdrawn: false
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

  handleWithdrawOpportunity = () => {
    this.setState({
      loading: true
    })

    this.props.withdrawOpportunity(this.props.match.params.briefId).then(response => {
      if (response.status === 200) {
        this.setState({
          loading: false,
          opportunityWithdrawn: true
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
    const { app, brief, errorMessage } = this.props

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
          title={`Unable to withdrawn opportunity`}
          errorMessage={`A ${brief.status} opportunity can not be withdrawn`}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (this.state.opportunityWithdrawn) {
      return (
        <WithdrawnOpportunity app={app} brief={brief} handleSubmit={this.handleFeedbackSubmit} setFocus={setFocus} />
      )
    }

    return <WithdrawOpportunity brief={brief} onCloseOpportunity={this.handleWithdrawOpportunity} />
  }
}

const mapStateToProps = state => ({
  app: state.app,
  brief: state.brief.brief,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  withdrawOpportunity: briefId => dispatch(withdrawOpportunity(briefId)),
  handleFeedbackSubmit: model => dispatch(handleFeedbackSubmit(model)),
  loadData: briefId => dispatch(loadBrief(briefId)),
  setError: message => dispatch(setErrorMessage(message))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithdrawOpportunityPage)
)
