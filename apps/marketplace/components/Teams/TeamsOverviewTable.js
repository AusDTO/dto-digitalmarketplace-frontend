import PropTypes from 'prop-types'
import React from 'react'

import { rootPath } from 'marketplace/routes'

import styles from './TeamsOverviewTable.scss'

const TeamsOverviewTable = props => {
  const { teams } = props
  const showActions = Object.values(teams).some(team => team.isTeamLead)

  return (
    <div className={`row`}>
      <div className="col-xs-12">
        <table className={`col-xs-12 ${styles.teamsOverview}`}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Members</th>
              <th scope="col">{showActions && 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(teams).map(teamId => (
              <tr key={teamId}>
                <td>{teams[teamId].name}</td>
                <td>{teams[teamId].members.join(', ')}</td>
                <td>
                  <a href={`${rootPath}/team/${teamId}/about/edit`}>Edit team</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

TeamsOverviewTable.defaultProps = {
  teams: {}
}

TeamsOverviewTable.propTypes = {
  teams: PropTypes.object
}

export default TeamsOverviewTable
