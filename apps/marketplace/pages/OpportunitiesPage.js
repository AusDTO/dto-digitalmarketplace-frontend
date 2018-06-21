import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadOpportunities } from 'marketplace/actions/opportunitiesActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import Opportunities from 'marketplace/components/Opportunities/Opportunities'
import { OpportunitiesHeader } from 'marketplace/components/Opportunities/OpportunitiesHeader'

class OpportunitiesPage extends Component {
  componentDidMount() {
    this.props.getOpportunities()
  }

  render() {
    const { currentlySending } = this.props

    return (
      <div>
        <OpportunitiesHeader />
        {currentlySending ? <LoadingIndicatorFullPage /> : <Opportunities opportunities={this.props.opportunities} />}
      </div>
    )
  }
}

OpportunitiesPage.defaultProps = {
  currentlySending: false
}

OpportunitiesPage.propTypes = {
  currentlySending: PropTypes.bool
}

const mapStateToProps = state => ({
  currentlySending: state.opportunities.currentlySending,
  opportunities: state.opportunities.opportunities
})

const mapDispatchToProps = dispatch => ({
  getOpportunities: filters => dispatch(loadOpportunities(filters))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OpportunitiesPage))
