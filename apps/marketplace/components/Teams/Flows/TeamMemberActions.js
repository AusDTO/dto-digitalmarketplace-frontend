import React from 'react'

import AUlinklist from '@gov.au/link-list/lib/js/react.js'

import commonStyles from './TeamStages.scss'

const TeamMemberActions = props => {
  const { handleConvertToTeamLead, handleRemoveTeamMember, id } = props

  return (
    <div className={commonStyles.selectedItemActionsContainer}>
      <AUlinklist
        className={`${commonStyles.selectedItemActions}`}
        inline
        items={[
          {
            link: '#change-to-lead',
            onClick: e => {
              e.preventDefault()
              handleConvertToTeamLead(id)
            },
            text: 'Change to lead'
          },
          {
            className: commonStyles.removeLink,
            link: '#remove',
            onClick: e => {
              e.preventDefault()
              handleRemoveTeamMember(id)
            },
            text: 'Remove'
          }
        ]}
      />
    </div>
  )
}

export default TeamMemberActions
