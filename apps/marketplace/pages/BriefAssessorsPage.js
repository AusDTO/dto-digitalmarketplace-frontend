import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { withRouter } from 'react-router-dom'
import formProps from 'shared/form/formPropsSelector'

import ErrorBox from 'shared/form/ErrorBox'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import BriefInviteAssessorsForm from 'marketplace/components/Brief/Assessors/BriefInviteAssessorsForm'
import { setErrorMessage, clearErrorMessages } from 'marketplace/actions/appActions'

const AssessorsMax = 5

export class BriefAssessorsPage extends Component {
  constructor(props) {
    super(props)
    this.state = { assessors: [] }
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  handleSubmit = data => {
    this.props.clearErrorMessages()
    this.setState(curState => {
      const newState = { ...curState }
      if (newState.assessors.length === AssessorsMax) {
        this.props.setErrorMessage('You cannot add any more evaluators')
      } else if (newState.assessors.includes(data.email_address)) {
        this.props.setErrorMessage(`${data.email_address} has already been invited`)
      } else {
        newState.assessors.push(data.email_address)
        this.props.reset(this.props.model)
      }
      return newState
    })
  }

  handleRemoveClick = (email, e) => {
    e.preventDefault()
    this.props.clearErrorMessages()
    this.setState(curState => ({
      assessors: curState.assessors.filter(item => item !== email)
    }))
  }

  render() {
    const { currentlySending } = this.props

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    return (
      <div>
        {currentlySending && <LoadingIndicatorFullPage />}
        {!currentlySending ? (
          <BriefInviteAssessorsForm
            setFocus={setFocus}
            handleSubmit={this.handleSubmit}
            handleRemoveClick={this.handleRemoveClick}
            assessors={this.state.assessors}
            remainingCount={AssessorsMax - this.state.assessors.length}
            submitClicked={this.onSubmitClicked}
            {...this.props}
          />
        ) : (
          <ErrorBox title="There was a problem loading the brief" setFocus={setFocus} />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...formProps(state, 'briefInviteAssessorsForm'),
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  setErrorMessage: message => dispatch(setErrorMessage(message)),
  clearErrorMessages: () => dispatch(clearErrorMessages()),
  reset: model => dispatch(actions.reset(model))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BriefAssessorsPage)
)
