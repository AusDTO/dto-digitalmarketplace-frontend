/* eslint-disable no-param-reassign */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { Redirect } from 'react-router-dom'

import { getTeam, saveTeam } from 'marketplace/actions/teamActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import formProps from 'shared/form/formPropsSelector'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { lastStageActions, stageActions } from '../../components/Teams/Flows/CreateTeamActions'
import TeamStages from '../../components/Teams/Flows/TeamStages'
import ProgressFlow from '../../components/ProgressFlow/ProgressFlow'

import { rootPath } from '../../routes'

const model = 'team'

export class CreateTeamFlowPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      teamCreated: false
    }

    this.handleStageMount = this.handleStageMount.bind(this)
    this.saveTeam = this.saveTeam.bind(this)
    this.setStageActions = this.setStageActions.bind(this)
  }

  componentDidMount() {
    const teamId = this.props.match.params.teamId
    if (teamId) {
      this.props.getTeam(teamId).then(response => this.props.loadModel(response.data))
    }

    this.setStageActions(TeamStages)
  }

  setStageActions = stages => {
    stages.forEach((stage, index, editStages) => {
      const props = {
        handleSaveAndContinue: this.handleSaveAndContinue,
        saveTeam: this.saveTeam
      }

      stage.actions = stageActions(props)

      if (editStages.length - 1 === index) {
        stage.actions = lastStageActions(props)
      }
    })
  }

  handleSaveAndContinue = () => {
    this.props.resetFormValidity()
  }

  handleStageMount = () => {
    this.props.resetFormValidity()
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
    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.state.teamCreated) {
      return <Redirect to={`${rootPath}/teams`} push />
    }

    const teamId = this.props.match.params.teamId
    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    return (
      <React.Fragment>
        {this.props.errorMessage && (
          <div className="row">
            <div className="col-xs-12">
              <ErrorBoxComponent
                title="A problem has occurred"
                errorMessage={this.props.errorMessage}
                setFocus={setFocus}
                form={{}}
                invalidFields={[]}
              />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-xs-12">
            <ProgressFlow
              basename={`${rootPath}/team/${teamId}`}
              model={model}
              onStageMount={this.handleStageMount}
              returnPath={`${rootPath}/teams`}
              saveModel={this.saveTeam}
              stages={TeamStages}
            />
          </div>
        </div>
      </React.Fragment>
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
  loadModel: data => dispatch(actions.load(model, data)),
  resetFormValidity: () => dispatch(actions.resetValidity(model)),
  saveTeam: team => dispatch(saveTeam(team))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTeamFlowPage)
