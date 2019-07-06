import React from 'react'

import AUbutton from '@gov.au/buttons/lib/js/react.js'

const SubmitAllUpdatesButton = () => <AUbutton>Submit all updates</AUbutton>

const SaveAndContinueButton = () => <AUbutton as="tertiary">Save and continue</AUbutton>

export const stageActions = (
  <div>
    <SubmitAllUpdatesButton />
    <SaveAndContinueButton />
  </div>
)

export const lastStageActions = (
  <div>
    <SubmitAllUpdatesButton />
  </div>
)
