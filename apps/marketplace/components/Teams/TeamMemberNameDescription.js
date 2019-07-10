import React from 'react'

import styles from './TeamStages.scss'

const TeamMemberNameDescription = props => {
  const { domain } = props

  return (
    <span>
      Members must already have a Digital Marketplace account in their name that ends in{' '}
      <span className={styles.bold}>@{domain}</span>
    </span>
  )
}

export default TeamMemberNameDescription
