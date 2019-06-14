import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getTeam, saveTeam } from 'marketplace/actions/teamActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import formProps from 'shared/form/formPropsSelector'
import TeamStages from '../../components/Teams/TeamStages'
import ProgressFlow from '../../components/ProgressFlow/ProgressFlow'
import { rootPath } from '../../routes'

const model = 'team'

export class TeamFlowPage extends Component {
  constructor(props) {
    super(props)
    this.saveTeam = this.saveTeam.bind(this)
  }

  componentDidMount() {
    const teamId = this.props.match.params.teamId
    if (teamId) {
      this.props.getTeam(teamId)
    }
  }

  saveTeam() {
    const data = { ...this.props[model] }
    return this.props.saveTeam(this.props.match.params.stage, data)
  }

  render() {
    if (this.props.errorMessage) {
      let hasFocused = false
      const setFocus = e => {
        if (!hasFocused) {
          hasFocused = true
          e.focus()
        }
      }

      return (
        <ErrorBoxComponent
          title="A problem occurred loading team details"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    const teamId = this.props.match.params.teamId

    return (
      <ProgressFlow
        basename={`${rootPath}/team/${teamId}`}
        model={model}
        previewPath=""
        publishText="Create team"
        returnPath={`${rootPath}/teams`}
        saveModel={this.saveTeam}
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
  errorMessage: state.app.errorMessage,
  ...formProps(state, model)
})

const mapDispatchToProps = dispatch => ({
  getTeam: teamId => dispatch(getTeam(teamId)),
  saveTeam: (stage, data) => dispatch(saveTeam(stage, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamFlowPage)
