import React from 'react'
import PropTypes from 'prop-types'
import { statusConvert } from 'marketplace/components/helpers'
import BuyerDashboardBriefTable from './BuyerDashboardBriefTable'
import styles from './BuyerDashboard.scss'
import mainStyles from '../../main.scss'

const BuyerDashboardAllBriefs = props => (
  <BuyerDashboardBriefTable
    additionalColumns={{
      headers: [
        <th scope="col" key={1} className={styles.colStatus}>
          Status
        </th>
      ],
      columns: [
        item => (
          <td key={item.id} className={styles.colStatus}>
            <div
              className={`${mainStyles.badge}
                ${(item.status === 'withdrawn' && mainStyles.lightGrey) ||
                  (item.status === 'live' && mainStyles.lightBlue) ||
                  (item.status === 'draft' && mainStyles.yellow)}`}
            >
              {statusConvert(item.status)}
            </div>
          </td>
        )
      ]
    }}
    dashboardLoaded={bc => props.dashboardLoaded(bc)}
  />
)

BuyerDashboardAllBriefs.propTypes = {
  dashboardLoaded: PropTypes.func.isRequired
}

export default BuyerDashboardAllBriefs
