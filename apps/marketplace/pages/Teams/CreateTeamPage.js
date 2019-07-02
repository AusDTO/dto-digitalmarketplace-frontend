import React from 'react'

import TeamStages from '../../components/Teams/TeamStages'
import ProgressFlow from '../../components/ProgressFlow/ProgressFlow'
import { rootPath } from '../../routes'

const model = 'createTeamForm'

const CreateTeamPage = () => (
  <ProgressFlow
    model={model}
    basename={`${rootPath}/teams/create`}
    stages={TeamStages}
    returnPath={`${rootPath}/teams`}
    previewPath=""
  />
)

export default CreateTeamPage
