import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom'

import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { applyEditsToOpportunity, loadBrief } from 'marketplace/actions/briefActions'
import { setErrorMessage } from 'marketplace/actions/appActions'
import { rootPath } from 'marketplace/routes'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import EditOpportunity from 'marketplace/components/Brief/Edit/EditOpportunity'
import EditOpportunityClosingDate from 'marketplace/components/Brief/Edit/EditOpportunityClosingDate'
import EditOpportunitySellers from 'marketplace/components/Brief/Edit/EditOpportunitySellers'
import EditOpportunitySummary from 'marketplace/components/Brief/Edit/EditOpportunitySummary'
import EditOpportunityTitle from 'marketplace/components/Brief/Edit/EditOpportunityTitle'
import EditOpportunityDocuments from 'marketplace/components/Brief/Edit/EditOpportunityDocuments'
import { hasEdits } from 'marketplace/components/Brief/Edit/helpers'
import { hasPermission } from 'marketplace/components/helpers'

const model = 'editOpportunityForm'

class EditOpportunityPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editsApplied: false,
      loading: false
    }

    // This reset is intended to clear any state that may be present when the browser's back button is clicked after a successful submit
    props.resetForm(model)

    this.handleSubmitEditsClick = this.handleSubmitEditsClick.bind(this)
    this.handleWindowBeforeUnload = this.handleWindowBeforeUnload.bind(this)
  }

  componentDidMount = () => {
    window.addEventListener('beforeunload', this.handleWindowBeforeUnload)

    if (this.props.match.params.briefId) {
      this.getBriefData()
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('beforeunload', this.handleWindowBeforeUnload)
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

    // clean out any empty documents
    const editedData = { ...edits }
    editedData.attachments = editedData.attachments.filter(x => x)
    editedData.requirementsDocument = editedData.requirementsDocument.filter(x => x)
    editedData.responseTemplate = editedData.responseTemplate.filter(x => x)

    this.props.applyEdits(match.params.briefId, editedData).then(response => {
      if (response.status === 200) {
        this.setState({
          editsApplied: true,
          loading: false
        })
      }
    })
  }

  handleWindowBeforeUnload = e => {
    const { brief, edits } = this.props
    const message = 'Are you sure you want to leave your edits without saving them?'

    if (hasEdits(brief, edits)) {
      e.preventDefault()
      e.returnValue = message
      return message
    }

    return null
  }

  render = () => {
    const { brief, edits, errorMessage, isOpenToAll, isPartOfTeam, isTeamLead, location, teams } = this.props

    if (!hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities')) {
      return <Redirect to={`${rootPath}/request-access/publish_opportunities`} />
    }

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

    if (this.state.editsApplied) {
      return <Redirect to={`${rootPath}/brief/${brief.id}/edited`} push />
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
            <Route path="/summary" render={() => <EditOpportunitySummary brief={brief} model={model} />} />
            <Route path="/documents" render={() => <EditOpportunityDocuments brief={brief} model={model} />} />
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
  errorMessage: state.app.errorMessage,
  isOpenToAll: state.brief.isOpenToAll,
  isPartOfTeam: state.app.isPartOfTeam,
  isTeamLead: state.app.isTeamLead,
  teams: state.app.teams
})

const mapDispatchToProps = dispatch => ({
  applyEdits: (briefId, data) => dispatch(applyEditsToOpportunity(briefId, data)),
  loadData: briefId => dispatch(loadBrief(briefId)),
  resetForm: formModel => dispatch(actions.reset(formModel)),
  setError: message => dispatch(setErrorMessage(message))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditOpportunityPage)
)
