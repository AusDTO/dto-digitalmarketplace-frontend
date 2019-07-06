/* eslint-disable no-param-reassign */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { getTeam, saveTeam } from 'marketplace/actions/teamActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import formProps from 'shared/form/formPropsSelector'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { EditTeamStages } from '../../components/Teams/TeamStages'
import ProgressFlow from '../../components/ProgressFlow/ProgressFlow'

import { rootPath } from '../../routes'

const model = 'team'

const SubmitAllUpdatesButton = () => <AUbutton>Submit all updates</AUbutton>

const SaveAndContinueButton = () => <AUbutton as="tertiary">Save and continue</AUbutton>

const stageActions = (
  <div>
    <SubmitAllUpdatesButton />
    <SaveAndContinueButton />
  </div>
)

const lastStageActions = (
  <div>
    <SubmitAllUpdatesButton />
  </div>
)

export class EditTeamFlowPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      teamCreated: false
    }

    this.saveTeam = this.saveTeam.bind(this)
    this.setStageActions = this.setStageActions.bind(this)
  }

  componentDidMount() {
    const teamId = this.props.match.params.teamId
    if (teamId) {
      this.props.getTeam(teamId)
    }

    this.setStageActions(EditTeamStages)
  }

  setStageActions = stages => {
    stages.forEach((stage, index, editStages) => {
      stage.actions = stageActions

      if (editStages.length - 1 === index) {
        stage.actions = lastStageActions
      }
    })
  }

  saveTeam(createTeam = false) {
    if (createTeam) {
      this.setState({
        loading: true
      })
    }

    const team = { ...this.props[model] }
    team.createTeam = createTeam

    return this.props.saveTeam(team).then(response => {
      this.setState({
        loading: false
      })

      if (response.status === 200 && createTeam) {
        this.setState({
          teamCreated: true
        })
      }

      return response
    })
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

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.state.teamCreated) {
      return <Redirect to={`${rootPath}/teams`} push />
    }

    const teamId = this.props.match.params.teamId

    return (
      <ProgressFlow
        basename={`${rootPath}/team/edit/${teamId}`}
        model={model}
        previewPath=""
        progressButtons={{
          continueText: 'Submit updates',
          publishText: 'Submit updates',
          showConfirmationCheckbox: false,
          showReturnText: false,
          showReviewButton: false,
          startText: 'Submit updates'
        }}
        returnPath={`${rootPath}/teams`}
        saveModel={this.saveTeam}
        stages={EditTeamStages}
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
  saveTeam: team => dispatch(saveTeam(team))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditTeamFlowPage)
