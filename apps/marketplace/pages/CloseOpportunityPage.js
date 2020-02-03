import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { closeOpportunity, loadBrief } from 'marketplace/actions/briefActions'
import { setErrorMessage } from 'marketplace/actions/appActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import CloseOpportunity from 'marketplace/components/Brief/CloseOpportunity'
import { rootPath } from 'marketplace/routes'

const model = 'closeOpportunityForm'

class CloseOpportunityPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      opportunityClosed: false
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

  handleCloseOpportunity = () => {
    this.setState({
      loading: true
    })

    this.props.closeOpportunity(this.props.match.params.briefId).then(response => {
      if (response.status === 200) {
        this.setState({
          loading: false,
          opportunityClosed: true
        })
      }
    })
  }

  render = () => {
    const { brief, canCloseOpportunity, errorMessage } = this.props
    const { loading, opportunityClosed } = this.state

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

    if (opportunityClosed) {
      return <Redirect to={`${rootPath}/brief/${brief.id}/closed`} push />
    }

    if (!canCloseOpportunity) {
      hasFocused = false
      return (
        <ErrorBoxComponent
          title="This opportunity cannot be closed"
          errorMessage={
            <span>
              This could be because the opportunity has already been closed or your invited seller has not completed
              their response. Please{' '}
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

    if (canCloseOpportunity) {
      return <CloseOpportunity brief={brief} model={model} onCloseOpportunity={this.handleCloseOpportunity} />
    }

    return null
  }
}

const mapStateToProps = state => ({
  brief: state.brief.brief,
  canCloseOpportunity: state.brief.canCloseOpportunity,
  closeOpportunityForm: state.closeOpportunityForm,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  closeOpportunity: briefId => dispatch(closeOpportunity(briefId)),
  loadData: briefId => dispatch(loadBrief(briefId)),
  setError: message => dispatch(setErrorMessage(message))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CloseOpportunityPage)
)
