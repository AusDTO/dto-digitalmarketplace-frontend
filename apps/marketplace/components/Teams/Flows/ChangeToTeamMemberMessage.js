import React from 'react'

import styles from './TeamStages.scss'

const ChangeToTeamMemberMessage = props => {
  const { name } = props

  return (
    <div>
      <p>
        Are you sure you want to change <span className={styles.bold}>{name}</span> to a team member?
      </p>
      <p>They will no longer be able to add and remove members, specify permissions or create team leads.</p>
    </div>
  )
}

export default ChangeToTeamMemberMessage
