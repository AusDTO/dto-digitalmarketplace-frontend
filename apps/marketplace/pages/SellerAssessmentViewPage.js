import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadEvidenceData } from 'marketplace/actions/supplierActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import SellerAssessmentCompleted from 'marketplace/components/SellerAssessment/SellerAssessmentView'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class SellerAssessmentViewPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    if (this.props.match.params.evidenceId) {
      this.getEvidenceData()
    }
  }

  getEvidenceData() {
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
          title="A problem occurred when loading the assessment details"
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

    // if (this.props.evidence && this.props.evidence.status && this.props.evidence.status !== 'submitted') {
    //   return (
    //     <ErrorBoxComponent
    //       title="A problem occurred when loading the assessment details"
    //       errorMessage="This assessment is not in a submitted state"
    //       setFocus={setFocus}
    //       form={{}}
    //       invalidFields={[]}
    //     />
    //   )
    // }

    if (this.props.evidence && this.props.evidence.submittedAt) {
      return <SellerAssessmentCompleted contactEmail={this.props.emailAddress} 
      evidence={this.props.evidence} />
    }

    return null
  }
}

const mapStateToProps = state => ({
  evidence: state.evidence,
  emailAddress: state.app.emailAddress
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: evidenceId => dispatch(loadEvidenceData(evidenceId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerAssessmentViewPage)
