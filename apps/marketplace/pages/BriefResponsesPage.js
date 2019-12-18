import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import BriefResponses from 'marketplace/components/Brief/BriefResponses'
import { loadBrief, deleteBriefResponse } from 'marketplace/actions/briefActions'
import { setErrorMessage } from 'marketplace/actions/appActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class BriefResponsesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }

    this.loadInitialData = this.loadInitialData.bind(this)
    this.handleBriefResponseDelete = this.handleBriefResponseDelete.bind(this)
  }

  componentDidMount() {
    this.loadInitialData()
  }

  loadInitialData() {
    const briefId = this.props.match.params.briefId
    if (briefId) {
      this.props.loadBrief(briefId).then(response => {
        if (response.status === 200) {
          this.setState({
            loading: false
          })
          if (response.data.brief.status !== 'live') {
            this.props.setError(`Edits can't be made on a ${response.data.brief.status} opportunity`)
          }
          if (response.data.brief.lot !== 'specialist') {
            this.props.setError('Only specialist opportunities allow you to edit or add candidates')
          }
        }
      })
    }
  }

  handleBriefResponseDelete(id) {
    this.setState({
      loading: true
    })
    this.props.deleteBriefResponse(id).then(this.loadInitialData())
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
          title="A problem occurred"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (!this.state.loading && this.props.briefResponses && this.props.brief) {
      return (
        <BriefResponses
          brief={this.props.brief}
          responses={this.props.briefResponses}
          onBriefResponseDelete={this.handleBriefResponseDelete}
        />
      )
    }

    return <LoadingIndicatorFullPage />
  }
}

const mapStateToProps = state => ({
  errorMessage: state.app.errorMessage,
  briefResponses: state.brief.briefResponses,
  brief: state.brief.brief
})

const mapDispatchToProps = dispatch => ({
  loadBrief: briefId => dispatch(loadBrief(briefId)),
  deleteBriefResponse: briefResponseId => dispatch(deleteBriefResponse(briefResponseId)),
  setError: message => dispatch(setErrorMessage(message))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BriefResponsesPage)
)
