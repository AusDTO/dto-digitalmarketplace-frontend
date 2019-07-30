import React from 'react'

import AUbutton from '@gov.au/buttons/lib/js/react.js'

import styles from './TeamFlowActions.scss'

const SubmitAllUpdatesButton = props => {
  const { onClick } = props

  // Passing true indicates the flow is complete and should transition to the next page
  return <AUbutton onClick={() => onClick(true)}>Save and close</AUbutton>
}

const SaveAndContinueButton = () => (
  <AUbutton as="secondary" className={styles.saveAndContinue} type="submit">
    Save and continue
  </AUbutton>
)

export const stageActions = props => {
  const { saveTeam } = props

  return (
    <div className={styles.actionsContainer}>
      <SubmitAllUpdatesButton onClick={saveTeam} />
      <SaveAndContinueButton />
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
