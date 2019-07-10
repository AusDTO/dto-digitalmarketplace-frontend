import React from 'react'

import AUlinklist from '@gov.au/link-list/lib/js/react.js'

import commonStyles from './TeamStages.scss'
import itemSelectStyles from '../../ItemSelect/SelectedItems.scss'

const TeamLeadActions = props => {
  const { handleConvertToTeamMember, handleRemoveTeamLead, id } = props

  return (
    <AUlinklist
      className={itemSelectStyles.selectedItemActions}
      inline
      items={[
        {
          link: '#change-to-member',
          onClick: e => {
            e.preventDefault()
            handleConvertToTeamMember(id)
          },
          text: 'Change to member'
        },
        {
          className: commonStyles.removeLink,
          link: '#remove',
          onClick: e => {
            e.preventDefault()
            handleRemoveTeamLead(id)
          },
          text: 'Remove'
        }
      ]}
    />
  )
}

export default TeamLeadActions
