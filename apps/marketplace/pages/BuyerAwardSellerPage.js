import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import { loadSuppliersResponded, handleBriefAwardedSubmit } from 'marketplace/actions/briefActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import BuyerAwardSeller from 'marketplace/components/Brief/BuyerAwardSeller'
import { rootPath } from 'marketplace/routes'
import { hasPermission } from 'marketplace/components/helpers'

export class BuyerAwardSellerPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      loading: true,
      suppliers: [],
      workOrderCreated: false
    }
  }

  componentDidMount() {
    this.props.loadData(this.props.match.params.briefId).then(response => {
      if (response.status === 200) {
        this.setState({
          ...response.data,
          loading: false
        })
      } else {
        this.setState({
          error: response.data.message,
          loading: false
        })
      }
    })
  }

  handleBriefAwardedSubmit(values) {
    this.setState({ loading: true })
    this.props.handleBriefAwardedSubmit(this.props.match.params.briefId, values).then(response => {
      if (response.status === 200) {
        this.setState({
          workOrderCreated: true,
          error: null
        })
      } else {
        this.setState({
          error: response.data.message
        })
      }
      this.setState({ loading: false })
    })
    window.scrollTo(0, 0)
  }

  render() {
    const { suppliers, workOrderCreated, error, loading } = this.state

    const { isPartOfTeam, isTeamLead, teams } = this.props

    if (workOrderCreated) {
      return <Redirect to={`${rootPath}/brief/${this.props.match.params.briefId}/download-work-order`} />
    }
    if (loading) {
      return <LoadingIndicatorFullPage />
    }
    if (!hasPermission(isPartOfTeam, isTeamLead, teams, 'create_work_orders')) {
      return <Redirect to={`${rootPath}/request-access/create_work_orders`} />
    }

    return (
      <React.Fragment>
        {error && (
          <AUpageAlert as="error">
            <h4>Error</h4>
            <p>{error}</p>
          </AUpageAlert>
        )}
        <BuyerAwardSeller
          suppliersResponded={suppliers}
          model="briefAwardSeller"
          handleSubmit={data => this.handleBriefAwardedSubmit(data)}
          workOrderCreated={workOrderCreated}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  loadData: briefId => dispatch(loadSuppliersResponded(briefId)),
  handleBriefAwardedSubmit: (briefId, model) => dispatch(handleBriefAwardedSubmit(briefId, model))
})

const mapStateToProps = state => ({
  teams: state.app.teams,
  isTeamLead: state.app.isTeamLead,
  isPartOfTeam: state.app.isPartOfTeam
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuyerAwardSellerPage))
