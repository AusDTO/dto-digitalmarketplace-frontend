/* eslint-disable no-param-reassign */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getTeam, saveTeam } from 'marketplace/actions/teamActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import formProps from 'shared/form/formPropsSelector'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { lastStageActions, stageActions } from '../../components/Teams/Flows/EditTeamActions'
import { EditTeamStages } from '../../components/Teams/Flows/TeamStages'
import ProgressFlow from '../../components/ProgressFlow/ProgressFlow'

import { rootPath } from '../../routes'

const model = 'team'

export class EditTeamFlowPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      returnToTeamsDashboard: false
    }

    this.saveTeam = this.saveTeam.bind(this)
    this.setStageActions = this.setStageActions.bind(this)
  }

  componentDidMount() {
    const teamId = this.props.match.params.teamId
    if (teamId) {
      this.props.getTeam(teamId).then(response => {
        if (response.status === 403) {
          this.setState({
            returnToTeamsDashboard: true
          })
        }
      })
    }

    this.setStageActions(EditTeamStages)
  }

  setStageActions = stages => {
    stages.forEach((stage, index, editStages) => {
      const props = { saveTeam: this.saveTeam }
      stage.actions = stageActions(props)

      if (editStages.length - 1 === index) {
        stage.actions = lastStageActions(props)
      }
    })
  }

  saveTeam(returnToTeamsDashboard = false) {
    if (returnToTeamsDashboard) {
      this.setState({
        loading: true
      })
    }

    const team = { ...this.props[model] }

    return this.props.saveTeam(team).then(response => {
      this.setState({
        loading: false
      })

      if (response.status === 403) {
        this.setState({
          returnToTeamsDashboard: true
        })
      }

      if (response.status === 200 && returnToTeamsDashboard) {
        this.setState({
          returnToTeamsDashboard: true
        })
      }

      return response
    })
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.state.returnToTeamsDashboard) {
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
              basename={`${rootPath}/team/edit/${teamId}`}
              model={model}
              returnPath={`${rootPath}/teams`}
              saveModel={this.saveTeam}
              stages={EditTeamStages}
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
  saveTeam: team => dispatch(saveTeam(team))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditTeamFlowPage)
