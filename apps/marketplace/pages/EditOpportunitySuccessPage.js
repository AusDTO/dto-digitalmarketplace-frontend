import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { handleFeedbackSubmit } from 'marketplace/actions/appActions'
import { loadBrief } from 'marketplace/actions/briefActions'
import EditedOpportunity from 'marketplace/components/Brief/Edit/EditedOpportunity'
import { rootPath } from 'marketplace/routes'

import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'

class EditOpportunitySuccessPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }

    this.getBriefData = this.getBriefData.bind(this)
    this.handleFeedbackSubmit = this.handleFeedbackSubmit.bind(this)
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

  handleFeedbackSubmit = values => {
    const { app, brief } = this.props

    this.props.handleFeedbackSubmit({
      object_id: brief.id,
      object_type: 'Brief',
      userType: app.userType,
      ...values
    })
  }

  render = () => {
    const { app, brief, edits, errorMessage } = this.props
    const { loading } = this.state

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

    if (brief.status !== 'live') {
      hasFocused = false
      return (
        <ErrorBoxComponent
          title="You cannot edit this opportunity"
          errorMessage={
            <span>
              This opportunity is not live. This could be because it has closed or been withdrawn. Please{' '}
              <a href={`${rootPath}/brief/${brief.id}/overview/${brief.lot}`}>return to the overview page</a> to check
              or contact us if you have any issues.
            </span>
          }
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    return (
      <EditedOpportunity
        app={app}
        brief={brief}
        edits={edits}
        onFeedbackSubmit={this.handleFeedbackSubmit}
        setFocus={setFocus}
      />
    )
  }
}

const mapStateToProps = state => ({
  app: state.app,
  brief: state.brief.brief,
  edits: state.editOpportunityForm,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  handleFeedbackSubmit: data => dispatch(handleFeedbackSubmit(data)),
  loadData: briefId => dispatch(loadBrief(briefId))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditOpportunitySuccessPage)
)
