/* eslint-disable */
import React, { Component } from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NotFound from 'marketplace/components/NotFound'
import formProps from 'shared/form/formPropsSelector'
import ErrorBox from 'shared/form/ErrorBox'
import BriefResponseNameForm from 'marketplace/components/Brief/BriefResponseNameForm'
import { loadBrief, handleBriefNameSubmit } from 'marketplace/actions/briefActions'

class BriefNamePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null
    }
  }

  componentWillMount() {
    const briefId = this.props.match.params.briefId
    if (briefId.length > 0) {
      this.props.loadInitialData(briefId)
    }
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  handleBriefNameSubmit = name => {
    this.props.handleBriefNameSubmit(name)
    this.props.history.push(`${this.props.match.url}/specialist`)
    window.scrollTo(0, 0)
  }

  render() {
    const { loadBriefSuccess, match, specialistName } = this.props

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    return (
      <div className="brief-page">
        <Switch>
          <Route
            path={match.url}
            render={() =>
              <span>
                {loadBriefSuccess
                  ? <BriefResponseNameForm
                      submitClicked={this.onSubmitClicked}
                      handleNameSubmit={name => this.handleBriefNameSubmit(name)}
                      setFocus={setFocus}
                      {...this.props}
                    />
                  : <ErrorBox title="There was a problem loading the brief details" setFocus={setFocus} />}{' '}
              </span>}
            />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...formProps(state, 'briefResponseNameForm'),
  brief: state.brief.brief,
  loadBriefSuccess: state.brief.loadBriefSuccess,
  currentlySending: state.app.currentlySending,
  specialistName: state.brief.specialistName,
  specialistNumber: state.brief.specialistNumber
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadBrief(briefId)),
  handleBriefNameSubmit: name => dispatch(handleBriefNameSubmit(name)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BriefNamePage))
