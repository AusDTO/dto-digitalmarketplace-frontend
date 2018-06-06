import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { loadOpportunities } from 'marketplace/actions/opportunitiesActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import Opportunities from 'marketplace/components/Opportunities/Opportunities'
import { OpportunitiesFilters } from 'marketplace/components/Opportunities/OpportunitiesFilters'
import styles from 'marketplace/components/Opportunities/Opportunities.scss'

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
    this.getOpportunities = this.getOpportunities.bind(this)
  }

  componentDidMount() {
    this.props.loadOpportunitiesData()
  }

  getOpportunities(statusFilters, openToFilters, typeFilters) {
    this.props.loadOpportunitiesData({
      statusFilters,
      openToFilters,
      typeFilters
    })
  }

  getActiveFilterCount = (includeTypeFilter = false) => {
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
    if (includeTypeFilter) {
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

  toggleStatusFilter = filter => {
    this.setState(curState => {
      const newState = { ...curState }
      if (filter in curState.activeStatusFilters) {
        newState.activeStatusFilters[filter] = !curState.activeStatusFilters[filter]
      }
      return newState
    })
  }

  toggleOpenToFilter = filter => {
    this.setState(curState => {
      const newState = { ...curState }
      if (filter in curState.activeOpenToFilters) {
        newState.activeOpenToFilters[filter] = !curState.activeOpenToFilters[filter]
      }
      return newState
    })
  }

  toggleTypeFilter = filter => {
    this.setState(curState => {
      const newState = { ...curState }
      if (filter in curState.activeTypeFilters) {
        newState.activeTypeFilters[filter] = !curState.activeTypeFilters[filter]
      }
      return newState
    })
  }

  clearAllFilters = () => {
    this.setState(curState => {
      const newState = { ...curState }
      newState.activeStatusFilters = {
        open: false,
        closed: false
      }
      newState.activeOpenToFilters = {
        selected: false,
        one: false,
        all: false
      }
      newState.activeTypeFilters = {
        innovation: false,
        outcomes: false,
        training: false,
        specialists: false
      }
      return newState
    })
  }

  applyFilters = () => {
    this.getOpportunities(this.state.activeStatusFilters, this.state.activeOpenToFilters, this.state.activeTypeFilters)
  }

  render() {
    const { currentlySending } = this.props

    const opportunitiesHeader = (
      <div className={`opportunities-page ${styles.container}`}>
        <div className={`${styles.header} row`}>
          <div className={`${styles.headerTitle} col-md-4 col-sm-4 col-xs-4`}>
            <AUheading size="xl" level="1">
              Opportunities
            </AUheading>
          </div>
          <OpportunitiesFilters
            accordionOpen={this.state.accordionOpen}
            openAccordion={this.openAccordion}
            closeAccordion={this.closeAccordion}
            applyFilters={this.applyFilters}
            activeStatusFilters={this.state.activeStatusFilters}
            activeOpenToFilters={this.state.activeOpenToFilters}
            activeTypeFilters={this.state.activeTypeFilters}
            toggleStatusFilter={this.toggleStatusFilter}
            toggleOpenToFilter={this.toggleOpenToFilter}
            toggleTypeFilter={this.toggleTypeFilter}
            getActiveFilterCount={this.getActiveFilterCount}
          />
        </div>
      </div>
    )

    const opportunitiesBody = <Opportunities {...this.props} />

    return (
      <div>
        {opportunitiesHeader}
        {currentlySending ? <LoadingIndicatorFullPage /> : opportunitiesBody}
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
