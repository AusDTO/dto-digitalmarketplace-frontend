import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import BuyerDashboardBriefTable from './BuyerDashboardBriefTable'
import styles from './BuyerDashboard.scss'

const BuyerDashboardLiveBriefs = props => (
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
          <td key={`questions_closed_at_${item.id}`} className={styles.colQuestion}>
            {format(new Date(item.questions_closed_at), 'DD/MM/YYYY')}
            <br />
            {`${item.questionsAsked} asked ${item.questionsAnswered} answered`}
          </td>
        ),
        item => (
          <td key={`closed_at_${item.id}`} className={styles.colClosing}>
            {format(new Date(item.closed_at), 'DD/MM/YYYY')}
            <br />
            {item.sellers
              ? `${item.responses} of ${Object.keys(item.sellers).length} submitted`
              : `${item.responses} submitted`}
          </td>
        )
      ]
    }}
    briefCountUpdated={bc => props.briefCountUpdated(bc)}
  />
)

BuyerDashboardLiveBriefs.propTypes = {
  briefCountUpdated: PropTypes.func.isRequired
}

export default BuyerDashboardLiveBriefs
