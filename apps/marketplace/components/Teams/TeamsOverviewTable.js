import PropTypes from 'prop-types'
import React from 'react'

import styles from './TeamsOverviewTable.scss'

const TeamsOverviewTable = props => {
  const { teams } = props

  return (
    <div className={`row`}>
      <div className="col-xs-12">
        <table className={`col-xs-12 ${styles.teamsOverview}`}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Members</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(teams).map(teamId => (
              <tr key={teamId}>
                <td>{teams[teamId].name}</td>
                <td>{teams[teamId].members}</td>
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
