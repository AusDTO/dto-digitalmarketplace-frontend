import React from 'react'

import styles from './TeamsOverview.scss'

const TeamsOverview = props => {
  const { createTeamButton } = props

  return (
    <div className={styles.teams}>
      <div className={styles.initial}>
        <p>Easily track and manage access to opportunities created within your organisation.</p>
        {createTeamButton}
        <a href="">How teams work</a>
      </div>
    </div>
  )
}

export default TeamsOverview
