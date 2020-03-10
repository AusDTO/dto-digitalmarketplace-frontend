import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'

import { loadOpportunityHistory } from 'marketplace/actions/briefActions'
import OpportunityHistory from 'marketplace/components/Brief/OpportunityHistory'
import SummaryComparison from 'marketplace/components/Brief/SummaryComparison'
import { rootPath } from 'marketplace/routes'
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
    const { match } = this.props

    if (match.params.briefId) {
      this.getOpportunityHistory(match.params.briefId)
    }
  }

  getOpportunityHistory = briefId => {
    this.setState({
      loading: true
    })

    this.props.loadHistory(briefId).then(response => {
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
      return (
        <BrowserRouter basename={`${rootPath}/brief/${brief.id}/history`}>
          <div className="col-xs-12">
            <Switch>
              <Route
                path="/summary"
                render={props => (
                  <SummaryComparison
                    brief={brief}
                    previous={props.location.state.previous}
                    updated={props.location.state.updated}
                  />
                )}
              />
              <Route path="/" render={() => <OpportunityHistory brief={brief} edits={edits} />} />
            </Switch>
          </div>
        </BrowserRouter>
      )
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
