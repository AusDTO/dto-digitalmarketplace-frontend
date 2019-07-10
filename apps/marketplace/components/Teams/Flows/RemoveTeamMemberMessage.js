import React from 'react'

import styles from './TeamStages.scss'

const RemoveTeamMemberMessage = props => {
  const { name } = props

  return (
    <div>
      <p>
        Are you sure you want to remove <span className={styles.bold}>{name}</span> from your team?
      </p>
      <p>You will become the owner of their opportunities.</p>
    </div>
  )
}

export default RemoveTeamMemberMessage
