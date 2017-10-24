/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import PageAlert from '@gov.au/page-alerts'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import BaseForm from 'shared/form/BaseForm'
import Layout from 'shared/Layout'
import ServiceEditList from 'orams/components/ServiceEditList/ServiceEditList'
import { loadServiceEditData, loadPricesData } from 'orams/actions/editPriceActions'

import styles from './PricingDetailsForm.scss'

class PricingDetailsForm extends BaseForm {
  static propTypes = {

  }

  componentDidMount() {
    this.props.loadServiceEdit()
  }

  loadStepTwo = (serviceTypeId, categoryId) => {
    this.props.loadPrices(serviceTypeId, categoryId)
  }

  mainSection() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.errorMessage) {
      <PageAlert as="error">
        <h4>There was a problem loading the page</h4>
      </PageAlert>
    }

    return <ServiceEditList editServiceData={this.props.editServiceData} linkClick={this.loadStepTwo} {...this.props}/>
  }

  render(props) {
    return (
      <Layout>
        {this.mainSection()}
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentlySending: state.app.currentlySending,
    errorMessage: state.app.errorMessage,
    editServiceData: state.editPricing.editServiceData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadServiceEdit: () => dispatch(loadServiceEditData()),
    loadPrices: (serviceTypeId, categoryId) => dispatch(loadPricesData(serviceTypeId, categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingDetailsForm)
