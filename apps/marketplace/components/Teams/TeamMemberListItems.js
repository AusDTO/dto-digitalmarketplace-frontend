import PropTypes from 'prop-types'
import React from 'react'

const TeamMemberListItems = props => {
  const { handleItemClick, items } = props

  return items.map(teamMember => (
    <li key={teamMember.id}>
      <a
        href={`#${teamMember.id}`}
        onClick={e => {
          e.preventDefault()
          handleItemClick(teamMember)
        }}
      >
        {teamMember.name} ({teamMember.email})
      </a>
    </li>
  ))
}

TeamMemberListItems.defaultProps = {
  handleItemClick: () => {},
  items: []
}

TeamMemberListItems.propTypes = {
  handleItemClick: PropTypes.func,
  items: PropTypes.array
}

export default TeamMemberListItems
