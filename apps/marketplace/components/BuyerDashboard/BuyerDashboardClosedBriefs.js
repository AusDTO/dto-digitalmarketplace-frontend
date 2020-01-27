import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'

import mainStyles from 'marketplace/main.scss'

import BuyerDashboardBriefTable from './BuyerDashboardBriefTable'

import styles from './BuyerDashboard.scss'

const BuyerDashboardClosedBriefs = props => (
  <BuyerDashboardBriefTable
    status={'closed'}
    additionalColumns={{
      headers: [
        <th scope="col" key={1} className={styles.colClosing}>
          Closing date
        </th>
      ],
      columns: [
        item =>
          item.status === 'withdrawn' ? (
            <td key={item.id} className={styles.colClosing}>
              <span className={mainStyles.darkGrayText}>Withdrawn</span>
            </td>
          ) : (
            <td key={item.id} className={styles.colClosing}>
              {format(new Date(item.closed_at), 'DD/MM/YYYY')}
            </td>
          )
      ]
    }}
    dashboardLoaded={bc => props.dashboardLoaded(bc)}
  />
)

BuyerDashboardClosedBriefs.propTypes = {
  dashboardLoaded: PropTypes.func.isRequired
}

export default BuyerDashboardClosedBriefs
