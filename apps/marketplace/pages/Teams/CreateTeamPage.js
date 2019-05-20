import React, { Component } from 'react'
import { connect } from 'react-redux'

import { saveTeam } from 'marketplace/actions/teamActions'
import formProps from 'shared/form/formPropsSelector'
import TeamStages from '../../components/Teams/TeamStages'
import ProgressFlow from '../../components/ProgressFlow/ProgressFlow'
import { rootPath } from '../../routes'

const model = 'createTeamForm'

export class CreateTeamPage extends Component {
  render() {
    return (
      <ProgressFlow
        basename={`${rootPath}/teams/create`}
        model={model}
        previewPath=""
        returnPath={`${rootPath}/teams`}
        saveModel={this.props.saveTeam}
        showConfirmationCheckbox={false}
        showReturnButton={false}
        showReviewButton={false}
        stages={TeamStages}
        startText="Save and continue"
      />
    )
  }
}

const mapStateToProps = state => ({
  csrfToken: state.app.csrfToken,
  ...formProps(state, model)
})

const mapDispatchToProps = dispatch => ({
  saveTeam: data => dispatch(saveTeam(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeamPage)
