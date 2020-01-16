import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { withdrawOpportunity, loadBrief } from 'marketplace/actions/briefActions'
import { setErrorMessage } from 'marketplace/actions/appActions'
import WithdrawOpportunity from 'marketplace/components/Brief/WithdrawOpportunity'
import { rootPath } from 'marketplace/routes'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'

const model = 'withdrawOpportunityForm'

class WithdrawOpportunityPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      opportunityWithdrawn: false
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

  handleWithdrawOpportunity = () => {
    this.setState({
      loading: true
    })

    this.props.withdrawOpportunity(this.props.match.params.briefId, this.props[model]).then(response => {
      if (response.status === 200) {
        this.setState({
          loading: false,
          opportunityWithdrawn: true
        })
      }
    })
  }

  render = () => {
    const { brief, errorMessage, isOpenToAll } = this.props
    const { loading, opportunityWithdrawn } = this.state

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

    if (opportunityWithdrawn) {
      return <Redirect to={`${rootPath}/brief/${brief.id}/withdrawn`} push />
    }

    if (brief.status !== 'live') {
      return (
        <ErrorBoxComponent
          title={`Unable to withdraw opportunity`}
          errorMessage={`A ${brief.status} opportunity can not be withdrawn`}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    return (
      <WithdrawOpportunity
        brief={brief}
        isOpenToAll={isOpenToAll}
        model={model}
        onWithdrawOpportunity={this.handleWithdrawOpportunity}
      />
    )
  }
}

const mapStateToProps = state => ({
  brief: state.brief.brief,
  errorMessage: state.app.errorMessage,
  isOpenToAll: state.brief.isOpenToAll,
  withdrawOpportunityForm: state.withdrawOpportunityForm
})

const mapDispatchToProps = dispatch => ({
  loadData: briefId => dispatch(loadBrief(briefId)),
  setError: message => dispatch(setErrorMessage(message)),
  withdrawOpportunity: (briefId, data) => dispatch(withdrawOpportunity(briefId, data))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithdrawOpportunityPage)
)
