import PropTypes from 'prop-types'
import React from 'react'

const TeamMemberListItems = props => {
  const { handleTeamMemberClick, teamMembers } = props

  return teamMembers.map(teamMember => (
    <li key={teamMember.id}>
      <a
        href={`#${teamMember.id}`}
        onClick={e => {
          e.preventDefault()
          handleTeamMemberClick(teamMember)
        }}
      >
        {teamMember.name} ({teamMember.email})
      </a>
    </li>
  ))
}

TeamMemberListItems.defaultProps = {
  handleTeamMemberClick: () => {},
  teamMembers: []
}

TeamMemberListItems.propTypes = {
  handleTeamMemberClick: PropTypes.func,
  teamMembers: PropTypes.array
}

export default TeamMemberListItems
