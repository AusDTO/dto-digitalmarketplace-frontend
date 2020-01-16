import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBrief } from 'marketplace/actions/briefActions'
import { handleFeedbackSubmit, setErrorMessage } from 'marketplace/actions/appActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import WithdrawnOpportunity from 'marketplace/components/Brief/WithdrawnOpportunity'
import { rootPath } from 'marketplace/routes'

class WithdrawOpportunitySuccessPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
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
    const { app, brief, errorMessage, isOpenToAll } = this.props
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

    if (brief.status !== 'withdrawn') {
      hasFocused = false
      return (
        <ErrorBoxComponent
          title="Opportunity has not been withdrawn"
          errorMessage={
            <span>
              Please <a href={`${rootPath}/brief/${brief.id}/overview/${brief.lot}`}>return to the overview page</a> to
              withdraw this opportunity.
            </span>
          }
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    return (
      <WithdrawnOpportunity
        app={app}
        brief={brief}
        onFeedbackSubmit={this.handleFeedbackSubmit}
        isOpenToAll={isOpenToAll}
        setFocus={setFocus}
      />
    )
  }
}

const mapStateToProps = state => ({
  app: state.app,
  brief: state.brief.brief,
  errorMessage: state.app.errorMessage,
  isOpenToAll: state.brief.isOpenToAll
})

const mapDispatchToProps = dispatch => ({
  handleFeedbackSubmit: data => dispatch(handleFeedbackSubmit(data)),
  loadData: briefId => dispatch(loadBrief(briefId)),
  setError: message => dispatch(setErrorMessage(message))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithdrawOpportunitySuccessPage)
)
