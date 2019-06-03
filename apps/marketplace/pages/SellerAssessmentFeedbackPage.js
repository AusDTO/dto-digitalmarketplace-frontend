import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadEvidenceFeedbackData } from 'marketplace/actions/supplierActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import SellerAssessmentFeedback from 'marketplace/components/SellerAssessment/SellerAssessmentFeedback'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class SellerAssessmentFeedbackPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    if (this.props.match.params.evidenceId) {
      this.getEvidenceFeedbackData()
    }
  }

  getEvidenceFeedbackData() {
    this.setState({
      loading: true
    })
    this.props.loadInitialData(this.props.match.params.evidenceId).then(() => {
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
          title="A problem occurred when loading the assessment feedback details"
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

    if (this.props.feedback && Object.keys(this.props.feedback.criteria).length === 0) {
      return (
        <ErrorBoxComponent
          title="A problem occurred when loading the assessment feedback details"
          errorMessage="The assessment feedback was not found"
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (this.props.feedback) {
      return <SellerAssessmentFeedback feedback={this.props.feedback} />
    }

    return null
  }
}

const mapStateToProps = state => ({
  feedback: state.evidence.feedback,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: evidenceId => dispatch(loadEvidenceFeedbackData(evidenceId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerAssessmentFeedbackPage)
