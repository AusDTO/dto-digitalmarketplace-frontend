import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBuyerDashboard } from 'marketplace/actions/dashboardActions'
import styles from './BuyerDashboard.scss'

class BuyerDashboardTeamOverview extends Component {
  componentDidMount() {
    this.props.loadData('/buyers/dashboard/team/overview')
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
          <div key={`item.${item.id}`} className={i % 2 ? `${styles.priceRow} ${styles.greyRow}` : styles.priceRow}>
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
  items: state.dashboard.buyerDashboard.items,
  loadSuccess: state.brief.loadBuyerDashboardSuccess,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  loadData: endpoint => dispatch(loadBuyerDashboard(endpoint))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuyerDashboardTeamOverview))
