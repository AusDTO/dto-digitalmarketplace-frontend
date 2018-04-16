import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBriefOverview } from 'marketplace/actions/briefActions'
import { rootPath } from 'marketplace/routes'

export class BriefOverview extends Component {
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    return (
      <div className="row">
        <h2>New overview</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
//   items: state.brief.buyerDashboardMyBriefs.items,
  loadSuccess: state.brief.loadBriefOverviewSuccess,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(loadBriefOverview())
})

export default connect(mapStateToProps, mapDispatchToProps)(BriefOverview)
