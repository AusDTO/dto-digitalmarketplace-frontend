import React, { Component } from 'react'
import { connect } from 'react-redux'
import ClosedDate from 'shared/ClosedDate'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBriefs } from 'marketplace/actions/buyerDashboardActions'
import BuyerDashboardBriefTable from './BuyerDashboardBriefTable'
import { statusConvert } from 'marketplace/components/helpers'
import { rootPath } from 'marketplace/routes'
import BuyerDashboardHelp from './BuyerDashboardHelp'
import styles from './BuyerDashboard.scss'

export class BuyerDashboardAllBriefs extends Component {
  render() {
    return (
      <BuyerDashboardBriefTable
        additionalColumns={{
          headers: [
            <th scope="col" key={1} className={styles.colSubmissions}>
              Status
            </th>
          ],
          columns: [
            item => (
              <td key={item.id} className={styles.colStatus}>
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
            )
          ]
        }}
      />
    )
  }
}

export default BuyerDashboardAllBriefs
