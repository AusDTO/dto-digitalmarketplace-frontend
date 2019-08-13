import React from 'react'

import AUbutton from '@gov.au/buttons/lib/js/react.js'

import styles from './TeamFlowActions.scss'

const CreateTeamButton = props => {
  const { onClick } = props

  // Passing true indicates the flow is complete and should transition to the next page
  return <AUbutton onClick={() => onClick(true)}>Create team</AUbutton>
}

const SaveAndContinueButton = () => <AUbutton type="submit">Save and continue</AUbutton>

export const stageActions = () => (
  <div className={styles.actionsContainer}>
    <SaveAndContinueButton />
  </div>
)

export const lastStageActions = props => {
  const { saveTeam } = props

  return (
    <div className={styles.actionsContainer}>
      <CreateTeamButton onClick={saveTeam} />
    </div>
  )
}
