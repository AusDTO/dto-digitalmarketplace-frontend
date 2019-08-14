import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createTeam } from 'marketplace/actions/teamActions'
import { rootPath } from 'marketplace/routes'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

export class CreateTeamPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teamId: 0
    }
  }

  componentDidMount() {
    this.props.createTeam().then(response => {
      if (response.status === 200) {
        this.setState({
          teamId: parseInt(response.data.id, 10)
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
          title="A problem occurred creating the team"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (this.state.teamId) {
      return <Redirect to={`${rootPath}/team/${this.state.teamId}/about`} />
    }

    return <LoadingIndicatorFullPage />
  }
}

const mapStateToProps = state => ({
  csrfToken: state.app.csrfToken,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  createTeam: () => dispatch(createTeam())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeamPage)
