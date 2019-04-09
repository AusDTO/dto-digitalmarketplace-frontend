import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { parse, stringify } from 'qs'
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
    type: {},
    location: {}
  }
  Object.keys(values).map(k => {
    if (parsed[k]) {
      const value = typeof parsed[k] === 'string' ? [parsed[k]] : parsed[k]
      value.map(filter => {
        values[k][filter] = true
        return true
      })
    }
    return true
  })
  return values
}

const getQueryStringFromFilterValues = values => {
  const qs = {
    status: [],
    openTo: [],
    type: [],
    location: []
  }
  Object.keys(values).map(filter => {
    Object.keys(values[filter]).map(k => values[filter][k] && qs[filter].push(k))
    return true
  })
  return stringify(qs, { arrayFormat: 'repeat' })
}

class OpportunitiesPage extends Component {
  constructor(props) {
    super(props)
    this.updateQueryString = this.updateQueryString.bind(this)
    this.queryStringValues = getFilterValuesFromQueryString(props.location.search.substr(1))
  }

  componentDidMount() {
    this.props.getOpportunities(this.queryStringValues)
  }

  getPageCount() {
    return Math.ceil(this.props.opportunities.length / this.props.pageLimit)
  }

  updateQueryString(values) {
    const qs = getQueryStringFromFilterValues(values)
    this.props.history.push(`${this.props.location.pathname}?${qs}`)
  }

  render() {
    const { currentlySending } = this.props
    const offset = (this.props.currentPage - 1) * this.props.pageLimit
    const opportunities = this.props.opportunities.slice(offset, offset + this.props.pageLimit)

    return (
      <div>
        <OpportunitiesHeader initialFilterValues={this.queryStringValues} updateQueryString={this.updateQueryString} />
        {currentlySending ? <LoadingIndicatorFullPage /> : <Opportunities opportunities={opportunities} />}
        {this.getPageCount() > 1 && !currentlySending && (
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OpportunitiesPage)
)
