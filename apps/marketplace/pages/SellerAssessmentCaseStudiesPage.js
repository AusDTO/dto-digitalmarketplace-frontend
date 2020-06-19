import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import SellerAssessmentView from 'marketplace/components/SellerAssessment/SellerAssessmentView'
import { loadDomainEvidenceData } from '../actions/supplierActions'
import SellerAssessmentCaseStudies from '../components/SellerAssessment/SellerAssessmentCaseStudies'

class SellerAssessmentCaseStudiesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }
    return <SellerAssessmentCaseStudies></SellerAssessmentCaseStudies>
  }
}

export default SellerAssessmentCaseStudiesPage
