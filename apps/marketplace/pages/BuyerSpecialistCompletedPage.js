import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPublicBrief } from 'marketplace/actions/briefActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import BuyerSpecialistCompleted from 'marketplace/components/BuyerSpecialist/BuyerSpecialistCompleted'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { handleFeedbackSubmit } from 'marketplace/actions/appActions'

class BuyerSpecialistCompletedPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitClicked: new Date(),
      loading: false
    }

    this.handleFeedbackSubmit = this.handleFeedbackSubmit.bind(this)
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

  handleFeedbackSubmit(values) {
    this.props.handleFeedbackSubmit({
      timeToComplete: this.state.submitClicked ? this.state.submitClicked - this.props.loadedAt : null,
      object_id: this.props.brief.id,
      object_type: 'Brief',
      userType: this.props.app.userType,
      ...values
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
        <BuyerSpecialistCompleted
          model="BuyerSpecialistForm"
          contactEmail={this.props.emailAddress}
          briefId={briefId}
          closingDate={this.props.brief.closedAt}
          app={this.props.app}
          handleSubmit={this.handleFeedbackSubmit}
        />
      )
    }

    return null
  }
}

const mapStateToProps = state => ({
  brief: state.brief.brief,
  loadedAt: state.brief.loadedAt,
  errorMessage: state.app.errorMessage,
  emailAddress: state.app.emailAddress,
  app: state.app
})

const mapDispatchToProps = dispatch => ({
  handleFeedbackSubmit: model => dispatch(handleFeedbackSubmit(model)),
  loadInitialData: briefId => dispatch(loadPublicBrief(briefId))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerSpecialistCompletedPage)
