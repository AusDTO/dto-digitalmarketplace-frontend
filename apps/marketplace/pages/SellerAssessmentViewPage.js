import React, { Component } from 'react'
import { connect } from 'react-redux'
import ErrorBox from 'shared/form/ErrorBox'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import SellerAssessmentView from 'marketplace/components/SellerAssessment/SellerAssessmentView'
import { loadDomainEvidenceData } from '../actions/supplierActions'

class SellerAssessmentViewPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.getEvidenceData = this.getEvidenceData.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.evidenceId) {
      this.getEvidenceData()
    }
  }

  getEvidenceData() {
    this.setState({
      loading: true
    })
    return this.props.loadInitialData(this.props.match.params.evidenceId).then(response => {
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
    if (!this.props.evidence) {
      return <ErrorBox title="There was a problem retrieving your evidence" />
    }
    return <SellerAssessmentView evidence={this.props.evidence} />
  }
}

const mapStateToProps = state => ({
  // might not need domain
  domain: state.domain.domain,
  evidence: state.evidence.evidence
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: evidenceId => dispatch(loadDomainEvidenceData(evidenceId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerAssessmentViewPage)
