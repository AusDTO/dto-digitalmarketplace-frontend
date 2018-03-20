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
      <div className="row">
        <table className={`${styles.resultListing} col-xs-12`}>
          <tbody>
            <tr className={styles.headingRow}>
              <th>Name</th>
              <th>Email</th>
            </tr>
            {this.props.items.map((item, i) =>
              <tr
                key={`item.${item.email}`}
                className={i % 2 ? `${styles.priceRow} ${styles.greyRow}` : styles.priceRow}
              >
                <td>
                  {item.name}
                </td>
                <td>
                  <a href={`mailto:${item.email}`}>
                    {item.email}
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
