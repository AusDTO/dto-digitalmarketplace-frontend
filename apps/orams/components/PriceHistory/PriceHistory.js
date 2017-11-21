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

import { loadBuyerSuppliers, loadStepTwo, setStep } from 'orams/actions/priceHistoryActions'

class PriceHistory extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.loadBuyerSuppliers()
  }

  loadStepTwo = supplierCode => {
    this.props.loadServices(supplierCode)
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
        return <ProviderHistoryForm {...this.props} />

      default:
        return ''
    }
  }

  render() {
    return (
      <div>
        {this.mainSection()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    buyerSuppliers: state.priceHistory.buyerSuppliers,
    step: state.priceHistory.step,
    serviceData: state.priceHistory.serviceData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBuyerSuppliers: () => dispatch(loadBuyerSuppliers()),
    loadStepTwo: supplierCode => dispatch(loadStepTwo(supplierCode)),
    goToStep: step => dispatch(setStep(step))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceHistory)
