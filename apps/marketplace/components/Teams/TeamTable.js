import React from 'react'

import commonStyles from './TeamStages.scss'
import styles from './ReviewStage.scss'

const TeamTable = props => {
  const { teamLeads, teamMembers } = props

  const sortedTeamMemberKeys = Object.keys(teamMembers).sort(
    (a, b) => (teamMembers[a].name > teamMembers[b].name ? 1 : -1)
  )

  return (
    <table className={`${styles.teamTable} ${commonStyles.stageTable}`}>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        {sortedTeamMemberKeys.map(userId => (
          <tr key={userId}>
            <td>{teamMembers[userId].name}</td>
            <td>{teamMembers[userId].emailAddress}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TeamTable
