import React from 'react'
import { connect } from 'react-redux'

import AUlinklist from '@gov.au/link-list/lib/js/react.js'

import commonStyles from './TeamStages.scss'

const TeamLeadActions = props => {
  const { handleConvertToTeamMember, handleRemoveTeamLead, id, emailAddress, currentUserEmailAddress } = props

  if (emailAddress === currentUserEmailAddress) {
    return ''
  }
  return (
    <div className={commonStyles.selectedItemActionsContainer}>
      <AUlinklist
        className={`${commonStyles.selectedItemActions}`}
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
    </div>
  )
}

const mapStateToProps = state => ({
  currentUserEmailAddress: state.app.emailAddress
})

export default connect(mapStateToProps)(TeamLeadActions)
