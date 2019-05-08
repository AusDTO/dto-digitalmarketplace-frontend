import React, { Component } from 'react'

import TeamStages from '../../components/Teams/TeamStages'
import ProgressFlow from '../../components/ProgressFlow/ProgressFlow'
import { rootPath } from '../../routes'

const model = 'CreateTeamForm'

export class CreateTeamPage extends Component {
  render() {
    return (
      <ProgressFlow
        model={model}
        basename={`${rootPath}/teams/create`}
        stages={TeamStages}
        returnPath={`${rootPath}/teams`}
        previewPath=""
      />
    )
  }
}

export default CreateTeamPage
