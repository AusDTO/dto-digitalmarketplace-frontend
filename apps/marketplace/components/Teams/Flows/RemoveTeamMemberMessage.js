import React from 'react'

import styles from './TeamStages.scss'

const RemoveTeamMemberMessage = props => {
  const { name } = props

  return (
    <div>
      <p>
        Are you sure you want to remove <span className={styles.bold}>{name}</span> from your team?
      </p>
      <ul>
        <li>
          The team will no longer be able to access the opportunities <span className={styles.bold}>{name}</span>{' '}
          created before joining the team.
        </li>
        <li>
          <span className={styles.bold}>{name}</span> will no longer be able to access the opportunities created in this
          team.
        </li>
      </ul>
    </div>
  )
}

export default RemoveTeamMemberMessage
