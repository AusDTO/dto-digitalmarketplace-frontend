import React from 'react'

import AUlinklist from '@gov.au/link-list/lib/js/react.js'

import commonStyles from './TeamStages.scss'
import itemSelectStyles from '../../ItemSelect/SelectedItems.scss'

const TeamMemberActions = props => {
  const { handleConvertToTeamLead, handleRemoveTeamMember, id } = props

  return (
    <AUlinklist
      className={itemSelectStyles.selectedItemActions}
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
  )
}

export default TeamMemberActions
