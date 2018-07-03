import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { parse } from 'query-string'
import { withRouter } from 'react-router-dom'
import { loadOpportunities, setCurrentPage } from 'marketplace/actions/opportunitiesActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import Opportunities from 'marketplace/components/Opportunities/Opportunities'
import { OpportunitiesPagination } from 'marketplace/components/Opportunities/OpportunitiesPagination'
import { OpportunitiesHeader } from 'marketplace/components/Opportunities/OpportunitiesHeader'

const getFilterValuesFromQueryString = qs => {
  const parsed = parse(qs)
  const values = {
    status: {},
    openTo: {},
    type: {}
  }
  if (parsed.status) {
    const status = typeof parsed.status === 'string' ? [parsed.status] : parsed.status
    status.map(filter => {
      values.status[filter] = true
      return true
    })
  }
  if (parsed.openTo) {
    const openTo = typeof parsed.openTo === 'string' ? [parsed.openTo] : parsed.openTo
    openTo.map(filter => {
      values.openTo[filter] = true
      return true
    })
  }
  if (parsed.type) {
    const type = typeof parsed.type === 'string' ? [parsed.type] : parsed.type
    type.map(filter => {
      values.type[filter] = true
      return true
    })
  }
  return values
}

class OpportunitiesPage extends Component {
  constructor(props) {
    super(props)
    this.queryStringValues = getFilterValuesFromQueryString(props.location.search)
  }

  componentDidMount() {
    this.props.getOpportunities(this.queryStringValues)
  }

  getPageCount() {
    return Math.ceil(this.props.opportunities.length / this.props.pageLimit)
  }

  render() {
    const { currentlySending } = this.props
    const offset = (this.props.currentPage - 1) * this.props.pageLimit
    const opportunities = this.props.opportunities.slice(offset, offset + this.props.pageLimit)

    return (
      <div>
        <OpportunitiesHeader initialFilterValues={this.queryStringValues} />
        {currentlySending ? <LoadingIndicatorFullPage /> : <Opportunities opportunities={opportunities} />}
        {this.getPageCount() > 1 &&
          !currentlySending && (
            <OpportunitiesPagination
              lastPage={this.getPageCount()}
              currentPage={this.props.currentPage}
              onPageClick={this.props.setCurrentPage}
            />
          )}
      </div>
    )
  }
}

OpportunitiesPage.defaultProps = {
  currentlySending: false,
  pageLimit: 25,
  currentPage: 1
}

OpportunitiesPage.propTypes = {
  currentlySending: PropTypes.bool,
  pageLimit: PropTypes.number,
  currentPage: PropTypes.number
}

const mapStateToProps = state => ({
  currentlySending: state.opportunities.currentlySending,
  opportunities: state.opportunities.opportunities,
  currentPage: state.opportunities.currentPage
})

const mapDispatchToProps = dispatch => ({
  getOpportunities: filters => dispatch(loadOpportunities(filters)),
  setCurrentPage: page => dispatch(setCurrentPage(page))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OpportunitiesPage))
