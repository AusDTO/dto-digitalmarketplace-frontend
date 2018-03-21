import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ClosedDate from 'shared/ClosedDate'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBuyerDashboard } from 'marketplace/actions/dashboardActions'
import { BUYER_DASHBOARD_TEAMBRIEFS_SUCCESS } from 'marketplace/constants/constants'
import { statusConvert } from 'marketplace/components/helpers'
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
        <div className="row">
          <div className="col-xs-12">
            <p>There are no team briefs to show.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <table className={`${styles.resultListing} col-xs-12`}>
            <thead>
              <tr className={styles.headingRow}>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Canberra closing time</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.props.items.map((item, i) =>
                <tr
                  key={`item.${item.id}`}
                  className={i % 2 ? `${styles.priceRow} ${styles.greyRow}` : styles.priceRow}
                >
                  <td className={styles.hideSmall}>
                    {item.id}
                  </td>
                  <td>
                    <a href={`/digital-marketplace/opportunities/${item.id}`}>
                      {item.name}
                    </a>
                  </td>
                  <td className={item.status === 'live' ? '' : styles.empty}>
                    {item.status === 'live' && <ClosedDate date={item.closed_at} />}
                  </td>
                  <td>
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
                  <td className={`${styles.actions} ${item.status === 'live' ? '' : styles.empty}`}>
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
