import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPublicBrief } from 'marketplace/actions/briefActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import BuyerTrainingCompleted from 'marketplace/components/BuyerTraining/BuyerTrainingCompleted'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class BuyerTrainingCompletedPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    if (this.props.match.params.briefId) {
      this.getBriefData()
    }
  }

  getBriefData() {
    this.setState({
      loading: true
    })
    this.props.loadInitialData(this.props.match.params.briefId).then(() => {
      this.setState({
        loading: false
      })
    })
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

    const briefId = this.props.match.params.briefId

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.brief && this.props.brief.status && this.props.brief.status !== 'live') {
      return (
        <ErrorBoxComponent
          title="A problem occurred when loading the brief details"
          errorMessage="This brief is not yet live"
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (this.props.brief && this.props.brief.closedAt) {
      return (
        <BuyerTrainingCompleted
          contactEmail={this.props.emailAddress}
          briefId={briefId}
          closingDate={this.props.brief.closedAt}
        />
      )
    }

    return null
  }
}

const mapStateToProps = state => ({
  brief: state.brief.brief,
  errorMessage: state.app.errorMessage,
  emailAddress: state.app.emailAddress
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadPublicBrief(briefId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerTrainingCompletedPage)
