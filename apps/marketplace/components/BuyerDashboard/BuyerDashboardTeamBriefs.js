import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ClosedDate from 'shared/ClosedDate'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBuyerDashboard } from 'marketplace/actions/dashboardActions'
import { BUYER_DASHBOARD_TEAMBRIEFS_SUCCESS } from 'marketplace/constants/constants'
import { statusConvert } from 'marketplace/components/helpers'
import BuyerDashboardHelp from './BuyerDashboardHelp'
import styles from './BuyerDashboard.scss'

class BuyerDashboardTeamBriefs extends Component {
  componentDidMount() {
    this.props.loadData(BUYER_DASHBOARD_TEAMBRIEFS_SUCCESS, '/dashboard/team/briefs')
  }

  render() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.items.length === 0) {
      return (
        <div>
          <div className="row">
            <div className="col-xs-12">
              <p>There are no team briefs to show.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <BuyerDashboardHelp />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <table className={`${styles.resultListing} ${styles.resultListingTeamBriefs} col-xs-12`}>
            <thead>
              <tr className={styles.headingRow}>
                <th scope="col" className={styles.colId}>
                  ID
                </th>
                <th scope="col" className={styles.colName}>
                  Name
                </th>
                <th scope="col" className={styles.colAuthor}>
                  Author
                </th>
                <th scope="col" className={styles.colClosing}>
                  Canberra closing time
                </th>
                <th scope="col" className={styles.colStatus}>
                  Status
                </th>
                <th scope="col" className={styles.colAction}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.items.map(item =>
                <tr key={`item.${item.id}`}>
                  <td className={styles.colId}>
                    {item.id}
                  </td>
                  <td className={styles.colName}>
                    <a href={`/digital-marketplace/opportunities/${item.id}`}>
                      {item.name}
                    </a>
                  </td>
                  <td className={styles.colAuthor}>
                    {item.author}
                  </td>
                  <td className={`${item.status === 'live' ? '' : styles.empty} ${styles.colClosing}`}>
                    {item.status === 'live' && <ClosedDate date={item.closed_at} />}
                  </td>
                  <td className={styles.colStatus}>
                    <div
                      className={`${styles.badge}
                        ${(item.status === 'withdrawn' && styles.badgeGrey) ||
                          (item.status === 'live' && styles.badgeBlue) ||
                          (item.status === 'closed' && styles.badgeYellow) ||
                          styles.badgeGrey}`}
                    >
                      {statusConvert(item.status)}
                    </div>
                  </td>
                  <td className={`${styles.actions} ${item.status === 'live' ? '' : styles.empty} ${styles.colAction}`}>
                    {item.status === 'live' &&
                      <a
                        href={`/buyers/frameworks/${item.framework}/requirements/${item.lot}/${item.id}/supplier-questions/answer-question`}
                      >
                        <strong>Answer a question</strong>
                      </a>}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <BuyerDashboardHelp />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.dashboard.buyerDashboardTeamBriefs.items,
  loadSuccess: state.dashboard.loadBuyerDashboardTeamBriefsSuccess,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  loadData: (type, endpoint) => dispatch(loadBuyerDashboard(type, endpoint))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuyerDashboardTeamBriefs))
