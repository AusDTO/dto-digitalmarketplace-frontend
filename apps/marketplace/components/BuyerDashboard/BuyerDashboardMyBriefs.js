import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ClosedDate from 'shared/ClosedDate'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBuyerDashboard } from 'marketplace/actions/dashboardActions'
import { BUYER_DASHBOARD_MYBRIEFS_SUCCESS } from 'marketplace/constants/constants'
import { statusConvert } from 'marketplace/components/helpers'
import styles from './BuyerDashboard.scss'

class BuyerDashboardMyBriefs extends Component {
  componentDidMount() {
    this.props.loadData(BUYER_DASHBOARD_MYBRIEFS_SUCCESS, '/dashboard/my/briefs')
  }

  render() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.items.length === 0) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <p>You don&apos;t have any briefs to show.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <table className={`${styles.resultListing} col-xs-12`}>
          <thead>
            <tr className={styles.headingRow}>
              <th>ID</th>
              <th>Name</th>
              <th>Canberra closing time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map((item, i) =>
              <tr key={`item.${item.id}`} className={i % 2 ? `${styles.priceRow} ${styles.greyRow}` : styles.priceRow}>
                <td className={styles.hideSmall}>
                  {item.id}
                </td>
                <td>
                  <a href={`/digital-marketplace/opportunities/${item.id}`}>
                    {item.name}
                  </a>
                </td>
                <td className={item.status === 'live' || item.status !== 'draft' ? '' : styles.empty}>
                  {item.status === 'live' &&
                    <span className={styles.hideSmall}>
                      <ClosedDate date={item.closed_at} />
                    </span>}
                  {item.status !== 'draft' && <div>{`${item.applications} Sellers applied`}</div>}
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
                <td className={styles.actions}>
                  {item.status === 'draft' &&
                    <a href={`/buyers/frameworks/${item.framework}/requirements/${item.lot}/${item.id}`}>
                      <strong>Edit draft</strong>
                    </a>}
                  {item.status === 'live' &&
                    <a
                      href={`/buyers/frameworks/${item.framework}/requirements/${item.lot}/${item.id}/supplier-questions/answer-question`}
                    >
                      <strong>Answer a question</strong>
                    </a>}
                  {item.status === 'closed' &&
                    <span>
                      <a href={`/buyers/frameworks/${item.framework}/requirements/${item.lot}/${item.id}/responses`}>
                        <strong>View Responses</strong>
                      </a>
                      <a
                        href={`/buyers/frameworks/${item.framework}/requirements/${item.lot}/${item.id}/work-orders/create`}
                      >
                        <strong>Create work order</strong>
                      </a>
                    </span>}
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
  items: state.dashboard.buyerDashboardMyBriefs.items,
  loadSuccess: state.dashboard.loadBuyerDashboardMyBriefsSuccess,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  loadData: (type, endpoint) => dispatch(loadBuyerDashboard(type, endpoint))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuyerDashboardMyBriefs))
