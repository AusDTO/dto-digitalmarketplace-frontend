import React from 'react'

import commonStyles from './TeamStages.scss'
import styles from './ReviewStage.scss'

const TeamTable = props => {
  const { teamLeads, teamMembers } = props

  const sortedTeamLeadKeys = Object.keys(teamLeads).sort((a, b) => (teamLeads[a].name > teamLeads[b].name ? 1 : -1))

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
        {sortedTeamLeadKeys.map(userId => (
          <tr key={userId}>
            <td>
              {teamLeads[userId].name}
              <span className={commonStyles.bold}> (team lead)</span>
            </td>
            <td>{teamLeads[userId].emailAddress}</td>
          </tr>
        ))}
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
