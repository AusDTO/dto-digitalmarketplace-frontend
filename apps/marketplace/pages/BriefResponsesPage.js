import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import BriefResponses from 'marketplace/components/Brief/BriefResponses'
import { loadBrief } from 'marketplace/actions/briefActions'
import { setErrorMessage } from 'marketplace/actions/appActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class BriefResponsesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const briefId = this.props.match.params.briefId
    if (briefId) {
      this.props.loadInitialData(briefId).then(response => {
        if (response.status === 200) {
          this.setState({
            loading: false
          })
          if (response.data.brief.lot !== 'specialist') {
            this.props.setError('Only specialist briefs allow you to edit or add candidates')
          }
          if (response.data.briefResponses.length === 0) {
            this.props.setError('You have not yet created a response for this opportunity')
          }
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
          title="A problem occurred"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (!this.state.loading && this.props.briefResponses && this.props.brief) {
      return <BriefResponses brief={this.props.brief} responses={this.props.briefResponses} />
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
  loadInitialData: briefId => dispatch(loadBrief(briefId)),
  setError: message => dispatch(setErrorMessage(message))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BriefResponsesPage)
)
