import React, { Component } from 'react'
import { connect } from 'react-redux'
import ClosedDate from 'shared/ClosedDate'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBuyerDashboardMyBriefs } from 'marketplace/actions/dashboardActions'
import { statusConvert } from 'marketplace/components/helpers'
import { rootPath } from 'marketplace/routes'
import BuyerDashboardHelp from './BuyerDashboardHelp'
import styles from './BuyerDashboard.scss'

const getBriefTitle = item => {
  let Title = <span>{item.name}</span>
  if (item.status !== 'draft') {
    let url = `/digital-marketplace/opportunities/${item.id}`
    if (item.lot === 'rfx') {
      url = `${rootPath}/${url}`
    }
    Title = <a href={url}>{item.name}</a>
  }
  return Title
}

export class BuyerDashboardMyBriefs extends Component {
  componentDidMount() {
    this.props.loadData()
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
              <h2 className="au-display-lg">Start your first brief</h2>
              <p>
                <a href={`${rootPath}/create-brief`}>Create a new brief</a> on the Marketplace.
              </p>
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
          <table className={`${styles.resultListing} col-xs-12`}>
            <thead>
              <tr className={styles.headingRow}>
                <th scope="col" className={styles.colId}>
                  ID
                </th>
                <th scope="col" className={styles.colName}>
                  Name
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
              {this.props.items.map(item => (
                <tr key={`item.${item.id}`}>
                  <td className={styles.colId}>{item.id}</td>
                  <td className={styles.colName}>{getBriefTitle(item)}</td>
                  <td
                    className={`${item.status === 'live' || item.status !== 'draft' ? '' : styles.empty} ${
                      styles.colClosing
                    }`}
                  >
                    {item.status === 'live' && (
                      <span className={styles.hideSmall}>
                        <ClosedDate date={item.closed_at} />
                      </span>
                    )}
                    {item.status !== 'draft' && (
                      <div>{`${item.applications} ${item.applications === 1 ? 'response' : 'responses'}`}</div>
                    )}
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
                  <td className={styles.colAction}>
                    {item.status === 'draft' &&
                      (item.lot === 'digital-professionals' || item.lot === 'training') && (
                        <a href={`${rootPath}/brief/${item.id}/overview`}>
                          <strong>Edit draft</strong>
                        </a>
                      )}
                    {item.status === 'draft' &&
                      item.lot === 'digital-outcome' && (
                        <a href={`/buyers/frameworks/${item.framework}/requirements/${item.lot}/${item.id}`}>
                          <strong>Edit draft</strong>
                        </a>
                      )}
                    {item.status === 'draft' &&
                      item.lot === 'rfx' && (
                        <a href={`${rootPath}/brief/${item.id}/overview/rfq`}>
                          <strong>Edit draft</strong>
                        </a>
                      )}
                    {item.status === 'live' && (
                      <a
                        href={`/buyers/frameworks/${item.framework}/requirements/${item.lot}/${
                          item.id
                        }/supplier-questions/answer-question`}
                      >
                        <strong>Answer a question</strong>
                      </a>
                    )}
                    {item.status === 'closed' && (
                      <a href={`${rootPath}/brief/${item.id}/download-responses`}>
                        <strong>View responses</strong>
                      </a>
                    )}
                    {item.status === 'closed' &&
                      item.work_order === null && (
                        <a
                          href={`/buyers/frameworks/${item.framework}/requirements/${item.lot}/${
                            item.id
                          }/work-orders/create`}
                        >
                          <strong>Create work order</strong>
                        </a>
                      )}
                    {item.status === 'closed' &&
                      item.work_order !== null && (
                        <a href={`/work-orders/${item.work_order}`}>
                          <strong>Edit work order</strong>
                        </a>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <BuyerDashboardHelp />
        </div>
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
  loadData: () => dispatch(loadBuyerDashboardMyBriefs())
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerDashboardMyBriefs)
