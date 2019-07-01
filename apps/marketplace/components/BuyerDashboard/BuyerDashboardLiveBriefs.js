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
import format from 'date-fns/format'

export class BuyerDashboardLiveBriefs extends Component {
  render() {
    return (
      <BuyerDashboardBriefTable
        status={'live'}
        additionalColumns={{
          headers: [
            <th scope="col" key={1} className={styles.colSubmissions}>
              Questions end date
            </th>,
            <th scope="col" key={2} className={styles.colStatus}>
              Closing date
            </th>
          ],
          columns: [
            item => (
              <td key={`questions_closed_at_${item.id}`} className={styles.colName}>
                {format(new Date(item.questions_closed_at), 'DD/MM/YYYY')}
              </td>
            ),
            item => (
              <td key={`closed_at_${item.id}`} className={styles.colClosing}>
                {format(new Date(item.closed_at), 'DD/MM/YYYY')}
              </td>
            )
          ]
        }}
      />
    )
  }
}

export default BuyerDashboardLiveBriefs
