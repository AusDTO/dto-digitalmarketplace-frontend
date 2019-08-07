import React from 'react'

import styles from './TeamStages.scss'

const ChangeToTeamLeadMessage = props => {
  const { name } = props

  return (
    <div>
      <p>
        Are you sure you want to change <span className={styles.bold}>{name}</span> to a team lead?
      </p>
      <p>They will be able to add and remove members, specify permissions and create other team leads.</p>
    </div>
  )
}

export default ChangeToTeamLeadMessage
