import React from 'react'

import styles from './TeamStages.scss'

const TeamLeadNameDescription = props => {
  const { domain } = props

  return (
    <span>
      Team leads must already have a Digital Marketplace account in their name that ends in{' '}
      <span className={styles.bold}>@{domain}</span>
    </span>
  )
}

export default TeamLeadNameDescription
