import React from 'react'

import commonStyles from './TeamStages.scss'
import styles from './ReviewStage.scss'

const TeamTable = props => (
  <table className={`${styles.teamTable} ${commonStyles.stageTable}`}>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
    <tbody>
      {props.teamMembers.map(teamMember => (
        <tr key={teamMember.email}>
          <td>{teamMember.name}</td>
          <td>{teamMember.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default TeamTable
