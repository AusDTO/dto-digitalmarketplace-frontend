import React from 'react'

import { rootPath } from 'marketplace/routes'

import styles from '../Overview.scss'

const OverviewHeaderClosedActionsList = props => {
  const { brief } = props

  return (
    <ul className={styles.menuList}>
      <li>
        <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>View opportunity</a>
      </li>
    </ul>
  )
}

export default OverviewHeaderClosedActionsList
