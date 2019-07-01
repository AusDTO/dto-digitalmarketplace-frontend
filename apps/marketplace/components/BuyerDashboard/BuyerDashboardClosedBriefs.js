import React, { Component } from 'react'
import { connect } from 'react-redux'
import ClosedDate from 'shared/ClosedDate'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBriefs } from 'marketplace/actions/buyerDashboardActions'
import { statusConvert } from 'marketplace/components/helpers'
import BuyerDashboardBriefTable from './BuyerDashboardBriefTable'
import { rootPath } from 'marketplace/routes'
import BuyerDashboardHelp from './BuyerDashboardHelp'
import styles from './BuyerDashboard.scss'
import format from 'date-fns/format'

export class BuyerDashboardClosedBriefs extends Component {
  render() {
    return (
      <BuyerDashboardBriefTable
        status={'closed'}
        additionalColumns={{
          headers: [
            <th scope="col" key={1} className={styles.colName}>
              Closing date
            </th>
          ],
          columns: [
            item => (
              <td key={item.id} className={styles.colClosing}>
                {format(new Date(item.closed_at), 'DD/MM/YYYY')}
              </td>
            )
          ]
        }}
      />
    )
  }
}

export default BuyerDashboardClosedBriefs
