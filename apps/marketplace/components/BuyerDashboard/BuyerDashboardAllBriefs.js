import React from 'react'
import PropTypes from 'prop-types'
import { statusConvert } from 'marketplace/components/helpers'
import BuyerDashboardBriefTable from './BuyerDashboardBriefTable'
import styles from './BuyerDashboard.scss'

const BuyerDashboardAllBriefs = props => (
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
    briefCountUpdated={bc => props.briefCountUpdated(bc)}
  />
)

BuyerDashboardAllBriefs.propTypes = {
  briefCountUpdated: PropTypes.func.isRequired
}

export default BuyerDashboardAllBriefs
