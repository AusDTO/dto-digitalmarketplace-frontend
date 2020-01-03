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
        <th scope="col" key={1} className={styles.colQuestion}>
          Questions end date
        </th>,
        <th scope="col" key={2} className={styles.colClosing}>
          Closing date
        </th>
      ],
      columns: [
        item => (
          <td key={`questions_closed_at_${item.id}`} className={styles.colQuestion}>
            {format(new Date(item.questions_closed_at), 'DD/MM/YYYY')}
            <br />
            {`${item.questionsAsked ? item.questionsAsked : 0} asked ${
              item.questionsAnswered ? item.questionsAnswered : 0
            } answered`}
          </td>
        ),
        item => (
          <td key={`closed_at_${item.id}`} className={styles.colClosing}>
            {format(new Date(item.closed_at), 'DD/MM/YYYY')}
          </td>
        )
      ]
    }}
    dashboardLoaded={bc => props.dashboardLoaded(bc)}
  />
)

BuyerDashboardLiveBriefs.propTypes = {
  dashboardLoaded: PropTypes.func.isRequired
}

export default BuyerDashboardLiveBriefs
