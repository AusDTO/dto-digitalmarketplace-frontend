import React from 'react'

import commonStyles from './TeamStages.scss'

const TeamTable = () => (
  <table className={commonStyles.stageTable}>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
    <tbody />
  </table>
)

export default TeamTable
