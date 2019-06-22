import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { loadSuppliersResponded, handleBriefAwardedSubmit } from 'marketplace/actions/briefActions'
// import ErrorBox from 'shared/form/ErrorBox'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import BuyerAwardSeller from 'marketplace/components/Brief/BuyerAwardSeller'
import { rootPath } from 'marketplace/routes'

export class BuyerAwardSellerPage extends Component {
  componentDidMount() {
    this.props.loadData(this.props.match.params.briefId)
  }

  handleBriefAwardedSubmit(values) {
    this.props.handleBriefAwardedSubmit(this.props.match.params.briefId, values)
    window.scrollTo(0, 0)
  }

  render() {
    const { currentlySending, suppliers, workOrderCreated } = this.props

    if (workOrderCreated) {
      return <Redirect to={`${rootPath}/brief/${this.props.match.params.briefId}/download-work-order`} />
    }
    if (currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    return (
      <BuyerAwardSeller
        suppliersResponded={suppliers}
        model="briefAwardSeller"
        handleSubmit={data => this.handleBriefAwardedSubmit(data)}
        workOrderCreated={workOrderCreated}
      />
    )
  }
}

const mapStateToProps = state => ({
  suppliers: state.buyerAwardSeller.suppliers,
  workOrderCreated: state.buyerAwardSeller.workOrderCreated,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  loadData: briefId => dispatch(loadSuppliersResponded(briefId)),
  handleBriefAwardedSubmit: (briefId, model) => dispatch(handleBriefAwardedSubmit(briefId, model))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuyerAwardSellerPage))
