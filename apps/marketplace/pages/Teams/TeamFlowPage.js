import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getTeam, saveTeam } from 'marketplace/actions/teamActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import formProps from 'shared/form/formPropsSelector'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import TeamStages from '../../components/Teams/TeamStages'
import ProgressFlow from '../../components/ProgressFlow/ProgressFlow'

import { rootPath } from '../../routes'

const model = 'team'

export class TeamFlowPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      teamCreated: false
    }

    this.saveTeam = this.saveTeam.bind(this)
  }

  componentDidMount() {
    const teamId = this.props.match.params.teamId
    if (teamId) {
      this.props.getTeam(teamId)
    }
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

    const teamId = this.props.match.params.teamId

    return (
      <ProgressFlow
        basename={`${rootPath}/team/${teamId}`}
        model={model}
        previewPath=""
        progressButtons={{
          publishText: 'Create team',
          showConfirmationCheckbox: false,
          showReturnText: false,
          showReviewButton: false,
          startText: 'Save and continue'
        }}
        returnPath={`${rootPath}/teams`}
        saveModel={this.saveTeam}
        stages={TeamStages}
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamFlowPage)
