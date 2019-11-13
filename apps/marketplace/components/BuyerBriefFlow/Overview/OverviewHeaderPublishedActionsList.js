import React from 'react'

import ClosedDate from 'shared/ClosedDate'

import styles from '../Overview.scss'

const OverviewHeaderPublishedActionsList = props => {
  const { brief } = props

  return (
    <ul className={styles.menuList}>
      <li>
        <div className={styles.headerMenuClosingTime}>
          Closing{' '}
          <strong>
            <ClosedDate countdown date={brief.dates.closing_time} />
          </strong>
        </div>
      </li>
    </ul>
  )
}

export default OverviewHeaderPublishedActionsList
