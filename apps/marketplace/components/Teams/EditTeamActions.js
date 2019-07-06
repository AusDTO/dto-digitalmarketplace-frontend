import React from 'react'

import AUbutton from '@gov.au/buttons/lib/js/react.js'

import styles from './EditTeamActions.scss'

const SubmitAllUpdatesButton = () => <AUbutton>Submit all updates</AUbutton>

const SaveAndContinueButton = () => <AUbutton as="tertiary">Save and continue</AUbutton>

export const stageActions = (
  <div className={styles.actionsContainer}>
    <SubmitAllUpdatesButton />
    <SaveAndContinueButton />
  </div>
)

export const lastStageActions = (
  <div className={styles.actionsContainer}>
    <SubmitAllUpdatesButton />
  </div>
)
