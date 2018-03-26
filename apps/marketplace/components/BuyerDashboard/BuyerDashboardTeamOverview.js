import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBuyerDashboard } from 'marketplace/actions/dashboardActions'
import { BUYER_DASHBOARD_TEAMOVERVIEW_SUCCESS } from 'marketplace/constants/constants'
import styles from './BuyerDashboard.scss'

export class BuyerDashboardTeamOverview extends Component {
  componentDidMount() {
    this.props.loadData(BUYER_DASHBOARD_TEAMOVERVIEW_SUCCESS, '/dashboard/team/overview')
  }

  render() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.items.length === 0) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <p>You don&apos;t have any team members to show.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>Active team members</h2>
          <p>
            If this list contains members who have left your organisation, please <a href="/contact-us">contact us</a>{' '}
            to have them removed.
          </p>
          <table className={`${styles.resultListing} ${styles.resultListingTeamOverview} col-xs-12`}>
            <thead>
              <tr className={styles.headingRow}>
                <th scope="col" className={styles.colName}>
                  Name
                </th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {this.props.items.map(item =>
                <tr key={`item.${item.email}`}>
                  <td className={styles.colName}>
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyerDashboardTeamOverview)
