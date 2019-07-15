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
            <br />
            {item.sellers
              ? `${item.responses ? item.responses : 0} of ${Object.keys(item.sellers).length} submitted`
              : `${item.responses ? item.responses : 0} submitted`}
          </td>
        )
      ]
    }}
    briefCountUpdated={bc => props.briefCountUpdated(bc)}
  />
)

BuyerDashboardClosedBriefs.propTypes = {
  briefCountUpdated: PropTypes.func.isRequired
}

export default BuyerDashboardClosedBriefs
