import React from 'react'

import AUbutton from '@gov.au/buttons/lib/js/react.js'

import styles from './TeamFlowActions.scss'

const CreateTeamButton = props => {
  const { onClick } = props

  // Passing true indicates the flow is complete and should transition to the next page
  return <AUbutton onClick={() => onClick(true)}>Create team</AUbutton>
}

const SaveAndContinueButton = props => {
  const { onSaveAndContinue } = props

  return (
    <AUbutton onClick={onSaveAndContinue} type="submit">
      Save and continue
    </AUbutton>
  )
}

export const stageActions = props => {
  const { handleSaveAndContinue } = props

  return (
    <div className={styles.actionsContainer}>
      <SaveAndContinueButton onSaveAndContinue={handleSaveAndContinue} />
    </div>
  )
}

export const lastStageActions = props => {
  const { saveTeam } = props

  return (
    <div className={styles.actionsContainer}>
      <CreateTeamButton onClick={saveTeam} />
    </div>
  )
}
