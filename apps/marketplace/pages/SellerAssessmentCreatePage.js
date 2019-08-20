import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createEvidence } from 'marketplace/actions/supplierActions'
import { rootPath } from 'marketplace/routes'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

export class SellerAssessmentCreatePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      evidenceId: 0
    }
  }

  componentDidMount() {
    if (this.props.match.params.domainId) {
      const briefId = this.props.match.params.briefId ? this.props.match.params.briefId : null
      this.props.createEvidence(this.props.match.params.domainId, briefId).then(response => {
        if (response.status === 200) {
          this.setState({
            evidenceId: parseInt(response.data.id, 10)
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
          title="A problem occurred when loading the assessment details"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    const domainId = this.props.match.params.domainId
    if (this.state.evidenceId && domainId) {
      return <Redirect to={`${rootPath}/seller-assessment/${this.state.evidenceId}/introduction`} />
    }

    return <LoadingIndicatorFullPage />
  }
}

const mapStateToProps = state => ({
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  createEvidence: (domainId, briefId) => dispatch(createEvidence(domainId, briefId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerAssessmentCreatePage)
