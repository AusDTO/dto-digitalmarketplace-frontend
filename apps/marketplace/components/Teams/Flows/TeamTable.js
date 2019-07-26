import React from 'react'

import { sortObjectByName } from 'marketplace/components/helpers'

import commonStyles from './TeamStages.scss'
import styles from './ReviewTeamStage.scss'

const TeamTable = props => {
  const { teamLeads, teamMembers } = props

  const sortedTeamLeadKeys = sortObjectByName(teamLeads)
  const sortedTeamMemberKeys = sortObjectByName(teamMembers)

  return (
    <table className={`${styles.teamTable} ${commonStyles.stageTable}`}>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        {sortedTeamLeadKeys &&
          sortedTeamLeadKeys.map(userId => (
            <tr key={userId}>
              <td>
                {teamLeads[userId].name}
                <span className={commonStyles.bold}> (team lead)</span>
              </td>
              <td>{teamLeads[userId].emailAddress}</td>
            </tr>
          ))}
        {sortedTeamMemberKeys &&
          sortedTeamMemberKeys.map(userId => (
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
