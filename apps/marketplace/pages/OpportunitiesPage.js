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
      accordionOpen: false,
      activeStatusFilters: {
        open: false,
        closed: false
      },
      activeOpenToFilters: {
        selected: false,
        one: false,
        all: false
      },
      activeTypeFilters: {
        innovation: false,
        outcomes: false,
        training: false,
        specialists: false
      }
    }
  }

  componentDidMount() {
    this.props.loadOpportunitiesData()
  }

  getOpportunities(filters) {
    this.props.loadOpportunitiesData({ ...filters })
  }

  getActiveFilterCount = (isMobile = false) => {
    let count = 0
    Object.keys(this.state.activeStatusFilters).map(filter => {
      if (this.state.activeStatusFilters[filter]) {
        count += 1
      }
      return true
    })
    Object.keys(this.state.activeOpenToFilters).map(filter => {
      if (this.state.activeOpenToFilters[filter]) {
        count += 1
      }
      return true
    })
    if (isMobile) {
      Object.keys(this.state.activeTypeFilters).map(filter => {
        if (this.state.activeTypeFilters[filter]) {
          count += 1
        }
        return true
      })
    }
    return count
  }

  openAccordion = () => {
    this.setState({ accordionOpen: true })
  }

  closeAccordion = () => {
    this.setState({ accordionOpen: false })
  }

  applyFilters = filters => {
    this.getOpportunities(filters)
    this.setState({
      activeStatusFilters: { ...filters.statusFilters },
      activeOpenToFilters: { ...filters.openToFilters },
      activeTypeFilters: { ...filters.typeFilters }
    })
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
          activeStatusFilters={this.state.activeStatusFilters}
          activeOpenToFilters={this.state.activeOpenToFilters}
          activeTypeFilters={this.state.activeTypeFilters}
          getActiveFilterCount={this.getActiveFilterCount}
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
