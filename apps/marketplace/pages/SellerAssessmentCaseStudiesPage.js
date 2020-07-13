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
    return (
      <SellerAssessmentCaseStudies
        domain={this.props.domain}
        approach={this.props.approach}
        client={this.props.client}
        opportunity={this.props.opportunity}
        outcome={this.props.outcome}
        project_links={this.props.project_links}
        referee_contact={this.props.referee_contact}
        referee_email={this.props.referee_email}
        referee_name={this.props.referee_name}
        referee_position={this.props.referee_position}
        roles={this.props.roles}
        service={this.props.service}
        timeframe={this.props.timeframe}
        title={this.props.title}
      />
    )
    // test={this.props.test} caseStudies={this.props.caseStudies}/>
  }
}

const mapStateToProps = state => ({
  domain: state.domain.domain,
  approach: state.evidence.approach,
  client: state.evidence.client,
  opportunity: state.evidence.opportunity,
  outcome: state.evidence.outcome,
  project_links: state.evidence.project_links,
  referee_contact: state.evidence.referee_contact,
  referee_email: state.evidence.referee_email,
  referee_name: state.evidence.referee_name,
  referee_position: state.evidence.referee_position,
  roles: state.evidence.roles,
  service: state.evidence.service,
  timeframe: state.evidence.timeframe,
  title: state.evidence.title
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: domainId => dispatch(loadCaseStudiesData(domainId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerAssessmentCaseStudiesPage)
