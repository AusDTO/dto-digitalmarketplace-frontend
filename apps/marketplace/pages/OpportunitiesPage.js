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
      activeFilterCount: 0,
      activeFilterCountMobile: 0
    }
    this.getOpportunities = this.getOpportunities.bind(this)
  }

  componentDidMount() {
    this.props.loadOpportunitiesData()
  }

  getOpportunities(filters) {
    this.props.loadOpportunitiesData({ ...filters })
  }

  getActiveFilterCount = (includeTypeFilter = false) =>
    includeTypeFilter ? this.state.activeFilterCountMobile : this.state.activeFilterCount

  openAccordion = () => {
    this.setState({ accordionOpen: true })
  }

  closeAccordion = () => {
    this.setState({ accordionOpen: false })
  }

  applyFilters = filters => {
    this.getOpportunities(filters)

    let count = 0
    Object.keys(filters.selectedStatusFilters).map(filter => {
      if (filters.selectedStatusFilters[filter]) {
        count += 1
      }
      return true
    })
    Object.keys(filters.selectedOpenToFilters).map(filter => {
      if (filters.selectedOpenToFilters[filter]) {
        count += 1
      }
      return true
    })
    this.setState({ activeFilterCount: count })

    Object.keys(filters.selectedTypeFilters).map(filter => {
      if (filters.selectedTypeFilters[filter]) {
        count += 1
      }
      return true
    })
    this.setState({ activeFilterCountMobile: count })
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
