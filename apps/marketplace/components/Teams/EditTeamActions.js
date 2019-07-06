import React from 'react'

import AUbutton from '@gov.au/buttons/lib/js/react.js'

import styles from './EditTeamActions.scss'

const SubmitAllUpdatesButton = props => {
  const { onClick } = props

  // Passing true indicates the flow is complete and should transition to the next page
  return <AUbutton onClick={() => onClick(true)}>Submit all updates</AUbutton>
}

const SaveAndContinueButton = props => {
  const { onClick } = props

  return (
    <AUbutton as="tertiary" onClick={() => onClick()} type="submit">
      Save and continue
    </AUbutton>
  )
}

export const stageActions = props => {
  const { saveTeam } = props

  return (
    <div className={styles.actionsContainer}>
      <SubmitAllUpdatesButton onClick={saveTeam} />
      <SaveAndContinueButton onClick={saveTeam} />
    </div>
  )
}

export const lastStageActions = props => {
  const { saveTeam } = props

  return (
    <div className={styles.actionsContainer}>
      <SubmitAllUpdatesButton onClick={saveTeam} />
    </div>
  )
}
