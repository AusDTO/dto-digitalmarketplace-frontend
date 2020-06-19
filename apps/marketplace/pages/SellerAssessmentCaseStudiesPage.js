import React, { Component } from 'react'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
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
