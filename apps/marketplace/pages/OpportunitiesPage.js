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
  const values = {
    status: {},
    openTo: {},
    type: {}
  }
  if (qs.status) {
    qs.status.split(',').map(filter => {
      values.status[filter] = true
      return true
    })
  }
  if (qs.openTo) {
    qs.openTo.split(',').map(filter => {
      values.openTo[filter] = true
      return true
    })
  }
  if (qs.type) {
    qs.type.split(',').map(filter => {
      values.type[filter] = true
      return true
    })
  }
  return values
}

class OpportunitiesPage extends Component {
  componentDidMount() {
    const queryStringValues = getFilterValuesFromQueryString(parse(this.props.location.search))
    this.props.getOpportunities(queryStringValues)
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
        <OpportunitiesHeader />
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
