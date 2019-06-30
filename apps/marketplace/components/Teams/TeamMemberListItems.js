import PropTypes from 'prop-types'
import React from 'react'

const TeamMemberListItems = props => {
  const { handleTeamMemberClick, items } = props

  return items.map(teamMember => (
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
  items: []
}

TeamMemberListItems.propTypes = {
  handleTeamMemberClick: PropTypes.func,
  items: PropTypes.array
}

export default TeamMemberListItems
