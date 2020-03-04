import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loadOpportunityHistory } from 'marketplace/actions/briefActions'
import OpportunityHistory from 'marketplace/components/Brief/OpportunityHistory'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class OpportunityHistoryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataLoaded: null,
      loading: false
    }
  }

  componentDidMount = () => {
    if (this.props.match.params.briefId) {
      this.getOpportunityHistory()
    }
  }

  getOpportunityHistory = () => {
    this.setState({
      loading: true
    })

    this.props.loadHistory(this.props.match.params.briefId).then(response => {
      if (response.status === 200) {
        this.setState({
          dataLoaded: true,
          loading: false
        })
      }
    })
  }

  render = () => {
    const { brief, edits } = this.props
    const { dataLoaded, errorMessage, loading } = this.state

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
          title="A problem occurred when loading the opportunity"
          errorMessage={errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (loading) {
      return <LoadingIndicatorFullPage />
    }

    if (dataLoaded) {
      return <OpportunityHistory brief={brief} edits={edits} />
    }

    return null
  }
}

const mapResetStateToProps = state => ({
  brief: state.brief.brief,
  edits: state.brief.edits,
  errorMessage: state.app.errorMessage
})

const mapResetDispatchToProps = dispatch => ({
  loadHistory: briefId => dispatch(loadOpportunityHistory(briefId))
})

export default withRouter(
  connect(
    mapResetStateToProps,
    mapResetDispatchToProps
  )(OpportunityHistoryPage)
)