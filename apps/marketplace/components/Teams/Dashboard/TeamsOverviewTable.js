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
            {Object.keys(teams).map(index => (
              <tr key={index}>
                <td>{teams[index].name}</td>
                <td>{teams[index].members.join(', ')}</td>
                <td>
                  {teams[index].isTeamLead && <a href={`${rootPath}/team/edit/${teams[index].id}/about`}>Edit team</a>}
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
