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
    return this.props.loadCaseStudiesData(this.props.match.params.domainId).then(response => {
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
    return <SellerAssessmentCaseStudies domain={this.props.domain} />
  }
}

const mapStateToProps = state => ({
  domain: state.domain.domain
})

const mapDispatchToProps = dispatch => ({
  loadCaseStudiesData: domainId => dispatch(loadCaseStudiesData(domainId))
    // loadInitialData: domainId => dispatch(loadCaseStudiesData(domainId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerAssessmentCaseStudiesPage)

// return this.props.loadInitialData(this.props.match.params.domainId).then(response => {
//   this.setState({
//     loading: false
//   })
//   return response.data
// })
