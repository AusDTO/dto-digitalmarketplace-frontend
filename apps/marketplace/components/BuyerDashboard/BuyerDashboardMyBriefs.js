import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ClosedDate from 'shared/ClosedDate'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBuyerDashboard } from 'marketplace/actions/dashboardActions'
import { BUYER_DASHBOARD_MYBRIEFS_SUCCESS } from 'marketplace/constants/constants'
import styles from './BuyerDashboard.scss'

class BuyerDashboardMyBriefs extends Component {
  componentDidMount() {
    this.props.loadData(BUYER_DASHBOARD_MYBRIEFS_SUCCESS, '/buyers/dashboard/my/briefs')
  }

  render() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    return (
      <div>
        <div className={styles.headingRow}>
          <div className="row">
            <div className={`${styles.alignCenter} col-md-1 col-sm-1`}>ID</div>
            <div className="col-md-3 col-sm-3">Name</div>
            <div className="col-md-3 col-sm-3">Canberra closing time</div>
            <div className="col-md-1 col-sm-1">Status</div>
            <div className="col-md-2 col-sm-2">Action</div>
            <div className="col-md-2 col-sm-2" />
          </div>
        </div>
        {this.props.items.map((item, i) =>
          <div key={`item.${item.id}`} className={i % 2 ? `${styles.priceRow} ${styles.greyRow}` : styles.priceRow}>
            <div className="row">
              <div className={`${styles.alignCenter} col-md-1 col-sm-1`}>
                {item.id}
              </div>
              <div className="col-md-3 col-sm-3">
                <a href={`/digital-marketplace/opportunities/${item.id}`}>
                  {item.name}
                </a>
              </div>
              <div className="col-md-3 col-sm-3">
                {item.status === 'live' && <ClosedDate date={item.closed_at} />}
                {item.status !== 'draft' && <div>{`${item.applications} Sellers applied`}</div>}
              </div>
              <div className="col-md-1 col-sm-1">
                <div
                  className={`${styles.badge} 
                    ${(item.status === 'withdrawn' && styles.badgeRed) ||
                      (item.status === 'live' && styles.badgeGreen) ||
                      (item.status === 'closed' && styles.badgeRed) ||
                      styles.badgeBlue}`}
                >
                  {item.status}
                </div>
              </div>
              <div className="col-md-2 col-sm-2">
                {item.status === 'draft' &&
                  <a href={`/buyers/frameworks/${item.framework}/requirements/${item.lot}/${item.id}`} rel="external">
                    <strong>Edit draft</strong>
                  </a>}
                {item.status === 'live' &&
                  <a href="/#" rel="external">
                    <strong>Answer a question</strong>
                  </a>}
                {item.status === 'closed' &&
                  <a href="/#" rel="external">
                    <strong>View Responses</strong>
                  </a>}
              </div>
              <div className="col-md-2 col-sm-2">
                {item.status === 'closed' &&
                  <a
                    href={`/buyers/frameworks/${item.framework}/requirements/${item.lot}/${item.id}/work-orders/create`}
                    rel="external"
                  >
                    <strong>Create work order</strong>
                  </a>}
              </div>
            </div>
          </div>
        )}
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
