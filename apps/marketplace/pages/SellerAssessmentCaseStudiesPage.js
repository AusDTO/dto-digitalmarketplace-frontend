import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import SellerAssessmentCaseStudies from '../components/SellerAssessment/SellerAssessmentCaseStudies'
import { loadCaseStudiesData } from '../actions/supplierActions'

class SellerAssessmentCaseStudiesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.getCaseStudiesData = this.getCaseStudiesData.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.domainId) {
      this.getCaseStudiesData()
    }
  }

  getCaseStudiesData() {
    this.setState({
      loading: true
    })
    return this.props.loadInitialData(this.props.match.params.domainId).then(response => {
      this.setState({
        loading: false
      })
      return response.data
    })
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }
    return <SellerAssessmentCaseStudies caseStudies={this.props.caseStudies} />
  }
}

const mapStateToProps = state => ({
  caseStudies: state.evidence
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: domainId => dispatch(loadCaseStudiesData(domainId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerAssessmentCaseStudiesPage)
