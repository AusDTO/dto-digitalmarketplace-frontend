import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBuyerDashboard } from 'marketplace/actions/dashboardActions'
import { BUYER_DASHBOARD_TEAMOVERVIEW_SUCCESS } from 'marketplace/constants/constants'
import styles from './BuyerDashboard.scss'

class BuyerDashboardTeamOverview extends Component {
  componentDidMount() {
    this.props.loadData(BUYER_DASHBOARD_TEAMOVERVIEW_SUCCESS, '/dashboard/team/overview')
  }

  render() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    return (
      <div>
        <div className={styles.headingRow}>
          <div className="row">
            <div className="col-sm-6">Name</div>
            <div className="col-sm-6">Email</div>
          </div>
        </div>
        {this.props.items.map((item, i) =>
          <div key={`item.${item.email}`} className={i % 2 ? `${styles.priceRow} ${styles.greyRow}` : styles.priceRow}>
            <div className="row">
              <div className="col-sm-6">
                {item.name}
              </div>
              <div className="col-sm-6">
                <a href={`mailto:${item.email}`}>
                  {item.email}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.dashboard.buyerDashboardTeamOverview.items,
  loadSuccess: state.dashboard.loadBuyerDashboardTeamOverviewSuccess,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  loadData: (type, endpoint) => dispatch(loadBuyerDashboard(type, endpoint))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuyerDashboardTeamOverview))
