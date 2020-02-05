import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'

import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { applyEditsToOpportunity, loadBrief } from 'marketplace/actions/briefActions'
import { setErrorMessage } from 'marketplace/actions/appActions'
import { rootPath } from 'marketplace/routes'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import EditOpportunity from 'marketplace/components/Brief/Edit/EditOpportunity'
import EditOpportunityClosingDate from 'marketplace/components/Brief/Edit/EditOpportunityClosingDate'
import EditOpportunitySellers from 'marketplace/components/Brief/Edit/EditOpportunitySellers'
import EditOpportunityTitle from 'marketplace/components/Brief/Edit/EditOpportunityTitle'

const model = 'editOpportunityForm'

class EditOpportunityPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editsApplied: false,
      loading: false
    }

    this.handleSubmitEditsClick = this.handleSubmitEditsClick.bind(this)
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

  handleSubmitEditsClick = () => {
    const { edits, match } = this.props

    this.setState({
      loading: true
    })

    this.props.applyEdits(match.params.briefId, edits).then(response => {
      if (response.status === 200) {
        this.setState({
          editsApplied: true,
          loading: false
        })
      }
    })
  }

  render = () => {
    const { brief, edits, errorMessage, isOpenToAll, location } = this.props

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
          title={`Unable to edit opportunity`}
          errorMessage={`A ${brief.status} opportunity can not be edited`}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    return (
      <BrowserRouter basename={`${rootPath}/brief/${brief.id}/edit`}>
        <div className="col-xs-12">
          <Switch>
            <Route path="/title" render={() => <EditOpportunityTitle brief={brief} model={model} />} />
            <Route path="/sellers" render={() => <EditOpportunitySellers brief={brief} model={model} />} />
            <Route path="/closing-date" render={() => <EditOpportunityClosingDate brief={brief} model={model} />} />
            <Route
              path="/"
              render={() => (
                <EditOpportunity
                  brief={brief}
                  edits={edits}
                  isOpenToAll={isOpenToAll}
                  location={location}
                  model={model}
                  onSubmitEdits={this.handleSubmitEditsClick}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  app: state.app,
  brief: state.brief.brief,
  edits: state.editOpportunityForm,
  isOpenToAll: state.brief.isOpenToAll,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  applyEdits: (briefId, data) => dispatch(applyEditsToOpportunity(briefId, data)),
  loadData: briefId => dispatch(loadBrief(briefId)),
  setError: message => dispatch(setErrorMessage(message))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditOpportunityPage)
)
