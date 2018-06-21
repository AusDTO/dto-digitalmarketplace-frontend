import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadOpportunities } from 'marketplace/actions/opportunitiesActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import Opportunities from 'marketplace/components/Opportunities/Opportunities'
import { OpportunitiesPagination } from 'marketplace/components/Opportunities/OpportunitiesPagination'
import { OpportunitiesHeader } from 'marketplace/components/Opportunities/OpportunitiesHeader'

class OpportunitiesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curPage: props.page
    }
    this.setCurrentPage = this.setCurrentPage.bind(this)
  }

  componentDidMount() {
    this.props.getOpportunities()
  }

  setCurrentPage(page) {
    this.setState({
      curPage: page
    })
  }

  getPageCount() {
    return Math.ceil(this.props.opportunities.length / this.props.limit)
  }

  render() {
    const { currentlySending } = this.props
    const offset = (this.state.curPage - 1) * this.props.limit
    const opportunities = this.props.opportunities.slice(offset, offset + this.props.limit)

    return (
      <div>
        <OpportunitiesHeader />
        {currentlySending ? <LoadingIndicatorFullPage /> : <Opportunities opportunities={opportunities} />}
        {this.getPageCount() > 1 &&
          !currentlySending && (
            <OpportunitiesPagination
              lastPage={this.getPageCount()}
              currentPage={this.state.curPage}
              onPageClick={this.setCurrentPage}
            />
          )}
      </div>
    )
  }
}

OpportunitiesPage.defaultProps = {
  currentlySending: false,
  page: 1,
  limit: 25
}

OpportunitiesPage.propTypes = {
  currentlySending: PropTypes.bool,
  page: PropTypes.number,
  limit: PropTypes.number
}

const mapStateToProps = state => ({
  currentlySending: state.opportunities.currentlySending,
  opportunities: state.opportunities.opportunities
})

const mapDispatchToProps = dispatch => ({
  getOpportunities: filters => dispatch(loadOpportunities(filters))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OpportunitiesPage))
