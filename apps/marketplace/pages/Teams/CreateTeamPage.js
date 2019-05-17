import React, { Component } from 'react'

import TeamStages from '../../components/Teams/TeamStages'
import ProgressFlow from '../../components/ProgressFlow/ProgressFlow'
import { rootPath } from '../../routes'

const model = 'createTeamForm'

export class CreateTeamPage extends Component {
  render() {
    return (
      <ProgressFlow
        model={model}
        basename={`${rootPath}/teams/create`}
        showReturnButton={false}
        showReviewButton={false}
        stages={TeamStages}
        returnPath={`${rootPath}/teams`}
        previewPath=""
      />
    )
  }
}

export default CreateTeamPage
