import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadOpportunities } from 'marketplace/actions/opportunitiesActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import Opportunities from 'marketplace/components/Opportunities/Opportunities'
import { OpportunitiesHeader } from 'marketplace/components/Opportunities/OpportunitiesHeader'

class OpportunitiesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accordionOpen: false
    }
  }

  componentDidMount() {
    this.props.loadOpportunitiesData()
  }

  getOpportunities(filters) {
    this.props.loadOpportunitiesData({ ...filters })
  }

  openAccordion = () => {
    this.setState({ accordionOpen: true })
  }

  closeAccordion = () => {
    this.setState({ accordionOpen: false })
  }

  applyFilters = filters => {
    this.getOpportunities(filters)
  }

  render() {
    const { currentlySending } = this.props

    return (
      <div>
        <OpportunitiesHeader
          accordionOpen={this.state.accordionOpen}
          openAccordion={this.openAccordion}
          closeAccordion={this.closeAccordion}
          applyFilters={this.applyFilters}
        />
        {currentlySending ? <LoadingIndicatorFullPage /> : <Opportunities {...this.props} />}
      </div>
    )
  }
}

OpportunitiesPage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  currentlySending: state.opportunities.currentlySending,
  opportunities: state.opportunities.opportunities
})

const mapDispatchToProps = dispatch => ({
  loadOpportunitiesData: (filters = {}) => dispatch(loadOpportunities(filters))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OpportunitiesPage))
