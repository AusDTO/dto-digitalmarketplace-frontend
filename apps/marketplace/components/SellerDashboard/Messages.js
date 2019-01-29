import React, { Component } from 'react'
import { connect } from 'react-redux'
import ClosedDate from 'shared/ClosedDate'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadSellerMessages } from 'marketplace/actions/sellerdashboardActions'
import { statusConvert } from 'marketplace/components/helpers'
import { rootPath } from 'marketplace/routes'
import styles from './SellerDashboard.scss'

const getLinkedBriefTitle = item => {
  const name = item.name || 'Untitled outcome'
  let url = ''
  switch (item.lot) {
    case 'rfx':
      url = `${rootPath}/brief/${item.id}/overview/rfx`
      break
    case 'digital-outcome':
      url = `/buyers/frameworks/${item.framework}/requirements/${item.lot}/${item.id}`
      break
    case 'digital-professionals':
    case 'training':
      url = `${rootPath}/brief/${item.id}/overview`
      break
    default:
      url = ''
  }
  return <a href={url}>{name}</a>
}

export class Messages extends Component {
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    // if (this.props.items.length === 0) {
    //   return (
    //     <div>
    //       <div className="row">
    //         <div className="col-xs-12">
    //           <span />
    //           <h2 className="au-display-lg">Start your first brief</h2>
    //           <p>
    //             <a href={`${rootPath}/create-brief`}>Create a new brief</a> on the Marketplace.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // }

    return (
      <div className="row">
        <div className="col-xs-12">
          <table className={`${styles.resultListing} col-xs-12`}>
            <thead>
              <tr className={styles.headingRow}>
                <th scope="col" className={styles.colId}>
                  Notification
                </th>
                <th scope="col" className={styles.colName}>
                  Severity
                </th>
                <th scope="col" className={styles.colClosing}>
                  Action
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
                </tr>
              ))}
            </tbody>
          </table>
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
  loadData: () => dispatch(loadSellerMessages())
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
