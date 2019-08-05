import React, { Component } from 'react'
import { connect } from 'react-redux'
import ClosedDate from 'shared/ClosedDate'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBuyerDashboardMyBriefs } from 'marketplace/actions/dashboardActions'
import { statusConvert } from 'marketplace/components/helpers'
import { rootPath } from 'marketplace/routes'
import BuyerDashboardHelp from './BuyerDashboardHelp'
import styles from './BuyerDashboard.scss'

const getLinkedBriefTitle = item => {
  let name = ''
  let url = ''
  switch (item.lot) {
    case 'rfx':
      url = `${rootPath}/brief/${item.id}/overview/rfx`
      name = 'Untitled seek proposals and quotes'
      break
    case 'atm':
      url = `${rootPath}/brief/${item.id}/overview/atm`
      name = 'Untitled ask the market'
      break
    case 'specialist':
      url = `${rootPath}/brief/${item.id}/overview/specialist`
      name = 'Untitled specialist'
      break
    case 'digital-outcome':
      url = `/buyers/frameworks/${item.framework}/requirements/${item.lot}/${item.id}`
      name = 'Untitled outcome'
      break
    case 'digital-professionals':
    case 'training':
      url = `${rootPath}/brief/${item.id}/overview`
      break
    default:
      url = ''
  }
  return <a href={url}>{item.name || name}</a>
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
              <span />
              <p>You don&apos;t have any briefs. Create a new request to get started.</p>
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
                  Closing time
                </th>
                <th scope="col" className={styles.colSubmissions}>
                  Submissions
                </th>
                <th scope="col" className={styles.colStatus}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.items.map(item => (
                <tr key={`item.${item.id}`}>
                  <td className={styles.colId}>{item.id}</td>
                  <td className={styles.colName}>{getLinkedBriefTitle(item)}</td>
                  <td
                    className={`${item.status === 'live' || item.status !== 'draft' ? '' : styles.empty} ${
                      styles.colClosing
                    }`}
                  >
                    {item.status === 'live' && (
                      <span className={styles.hideSmall}>
                        <ClosedDate countdown date={item.closed_at} />
                      </span>
                    )}
                  </td>
                  <td className={styles.colSubmissions}>
                    {item.status !== 'draft' && (
                      <div>
                        {item.applications}
                        <span className={styles.submissionCount}> submission{item.applications !== 1 && 's'}</span>
                      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerDashboardMyBriefs)
