import React from 'react'
import PropTypes from 'prop-types'

import { rootPath } from 'marketplace/routes'

import styles from '../Overview.scss'

const OverviewHeaderDefaultActionsList = props => {
  const { brief } = props

  return (
    <ul className={styles.menuList}>
      <li>
        <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>View opportunity</a>
      </li>
    </ul>
  )
}

OverviewHeaderDefaultActionsList.defaultProps = {
  brief: {}
}

OverviewHeaderDefaultActionsList.propTypes = {
  brief: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired
}

export default OverviewHeaderDefaultActionsList
