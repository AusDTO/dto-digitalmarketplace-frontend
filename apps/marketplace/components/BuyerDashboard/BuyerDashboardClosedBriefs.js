import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
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
        item => (
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
