/* eslint-disable */
import React, { Component } from 'react'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import PageAlert from '@gov.au/page-alerts'
import ProviderList from 'orams/components/ProviderList/ProviderList'
import ProviderHistoryForm from 'orams/components/ProviderHistoryForm/ProviderHistoryForm'

import styles from './PriceHistory.scss'

import { loadBuyerSuppliers, loadStepTwo, setStep, loadPriceData } from 'orams/actions/priceHistoryActions'

class PriceHistory extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.loadBuyerSuppliers()
  }

  clickLoadStepTwo = supplierCode => {
    this.props.loadServices(supplierCode)
  }

  submitProviderHistoryForm = data => {
    this.props.loadPriceData(data)
  }

  mainSection() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.errorMessage) {
      return (
        <PageAlert as="error">
          <h4>There was a problem loading the page</h4>
        </PageAlert>
      )
    }

    switch (this.props.step) {
      case 1:
        return <ProviderList {...this.props} />
      case 2:
        return <ProviderHistoryForm submitProviderHistoryForm={this.submitProviderHistoryForm} {...this.props} />

      default:
        return ''
    }
  }

  render() {
    return <div>{this.mainSection()}</div>
  }
}

const mapStateToProps = state => {
  return {
    buyerSuppliers: state.priceHistory.buyerSuppliers,
    step: state.priceHistory.step,
    serviceData: state.priceHistory.serviceData,
    priceHistoryData: state.priceHistory.priceHistoryData,
    currentlySending: state.app.currentlySending
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBuyerSuppliers: () => dispatch(loadBuyerSuppliers()),
    clickLoadStepTwo: supplierCode => dispatch(loadStepTwo(supplierCode)),
    goToStep: step => dispatch(setStep(step)),
    loadPriceData: data => dispatch(loadPriceData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceHistory)
