/* eslint-disable */
import React, { Component } from 'react'
import { actions } from 'react-redux-form'
import { withRouter, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ErrorBox from 'shared/form/ErrorBox'
import NotFound from 'marketplace/components/NotFound'
import formProps from 'shared/form/formPropsSelector'
import BriefResponseForm from 'marketplace/components/Brief/BriefResponseForm'
import { loadBrief,
  handleBriefResponseSubmit,
  handleBriefNameSubmit,
  addAnotherSpecialistSubmit,
  handleSpecialistNumberSubmit
} from 'marketplace/actions/briefActions'
import { handleFeedbackSubmit } from 'marketplace/actions/appActions'
import BriefResponseSubmitted from 'marketplace/components/Brief/BriefResponseSubmitted'
import BriefSubmitted from 'marketplace/components/Brief/BriefSubmitted'

class BriefPage extends Component {
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
    return this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  onAddAnotherClicked = () => {
    return this.props.addAnotherSpecialistSubmit(true)
  }

  handleFeedbackSubmit(values) {
    this.props.handleFeedbackSubmit({
      timeToComplete: this.state.submitClicked ? this.state.submitClicked - this.props.loadedAt : null,
      object_id: this.props.brief.id,
      object_type: 'Brief',
      userType: this.props.app.userType,
      ...values
    })
  }

  handleBriefResponseSubmit(values) {
    let submitData = {
      specialistName: values.specialistName ? values.specialistName : null,
      dayRate: values.dayRate,
      availability: values.availability,
      essentialRequirements: values.essentialRequirements,
      niceToHaveRequirements: values.niceToHaveRequirements ? values.niceToHaveRequirements : null
    }
    if (this.props.addAnotherSpecialist) {
      this.props.handleBriefNameSubmit('')
      this.props.handleSpecialistNumberSubmit(1)
      window.scrollTo(0, 0)
    }
    const { brief } = this.props
    this.props.handleBriefResponseSubmit(brief.id, submitData)
  }

  handleBriefNameSubmit = name => {
    this.props.handleBriefNameSubmit(name)
    window.scrollTo(0, 0)
  }

  render() {
    const { loadBriefSuccess, match } = this.props

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
            path={`${match.url}/published`}
            render={() =>
              <BriefSubmitted
                setFocus={setFocus}
                submitClicked={this.state.submitClicked}
                handleSubmit={values => this.handleFeedbackSubmit(values)}
                {...this.props}
              />}
          />
          <Route
            path={`${match.url}/respond/submitted`}
            render={() =>
              <BriefResponseSubmitted
                setFocus={setFocus}
                submitClicked={this.state.submitClicked}
                handleSubmit={values => this.handleFeedbackSubmit(values)}
                {...this.props}
              />}
          />
          <Route
            path={`${match.url}/respond`}
            render={() =>
              <span>
                {loadBriefSuccess
                  ? <BriefResponseForm
                      submitClicked={this.onSubmitClicked}
                      addAnotherClicked={this.onAddAnotherClicked}
                      handleNameSubmit={name => this.handleBriefNameSubmit(name)}
                      handleSubmit={values => this.handleBriefResponseSubmit(values)}
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

BriefPage.defaultProps = {
  loadInitialData: null,
  handleBriefResponseSubmit: null,
  loadBriefSuccess: null,
  briefResponseSuccess: null
}

BriefPage.propTypes = {
  brief: PropTypes.shape({
    briefSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  loadInitialData: PropTypes.func,
  handleBriefResponseSubmit: PropTypes.func,
  loadBriefSuccess: PropTypes.bool,
  briefResponseSuccess: PropTypes.bool
}

const mapResetStateToProps = state => ({
  ...formProps(state, 'briefResponseForm'),
  brief: state.brief.brief,
  loadedAt: state.brief.loadedAt,
  app: state.app,
  supplierCode: state.app.supplierCode,
  loadBriefSuccess: state.brief.loadBriefSuccess,
  briefResponseSuccess: state.brief.briefResponseSuccess,
  currentlySending: state.app.currentlySending,
  specialistName: state.brief.specialistName,
  specialistNumber: state.brief.specialistNumber,
  addAnotherSpecialist: state.brief.addAnotherSpecialist
})

const mapResetDispatchToProps = dispatch => ({
  handleFeedbackSubmit: model => dispatch(handleFeedbackSubmit(model)),
  handleBriefResponseSubmit: (briefId, model) => dispatch(handleBriefResponseSubmit(briefId, model)),
  loadInitialData: briefId => dispatch(loadBrief(briefId)),
  handleBriefNameSubmit: name => dispatch(handleBriefNameSubmit(name)),
  handleSpecialistNumberSubmit: number => dispatch(handleSpecialistNumberSubmit(number)),
  addAnotherSpecialistSubmit: bool => dispatch(addAnotherSpecialistSubmit(bool))
})

export default withRouter(connect(mapResetStateToProps, mapResetDispatchToProps)(BriefPage))
