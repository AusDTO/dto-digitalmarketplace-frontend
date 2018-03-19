import React, { Component } from 'react'
import { actions } from 'react-redux-form'
import { withRouter, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ErrorBox from 'shared/form/ErrorBox'
import NotFound from 'marketplace/components/NotFound'
import formProps from 'shared/form/formPropsSelector'
import BriefResponseForm from 'marketplace/components/Brief/BriefResponseForm'
import BriefSpecialistResponseForm from 'marketplace/components/Brief/BriefSpecialistResponseForm'
import {
  loadBrief,
  handleBriefResponseSubmit,
  handleBriefNameSubmit,
  addAnotherSpecialistSubmit,
  handleSpecialistNumberSubmit
} from 'marketplace/actions/briefActions'
import { handleFeedbackSubmit } from 'marketplace/actions/appActions'
import BriefSpecialistResponseSubmitted from 'marketplace/components/Brief/BriefSpecialistResponseSubmitted'
import BriefSubmitted from 'marketplace/components/Brief/BriefSubmitted'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import BriefResponseSubmitted from 'marketplace/components/Brief/BriefResponseSubmitted'

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

  onSubmitClicked = () =>
    this.setState({
      submitClicked: new Date().valueOf()
    })

  onAddAnotherClicked = () => this.props.changeModel(`${this.props.model}.addAnother`, true)

  onSpecialistSubmitClicked = () => this.props.changeModel(`${this.props.model}.addAnother`, false)

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
    const { brief } = this.props
    this.props.handleBriefResponseSubmit(brief.id, values)
    window.scrollTo(0, 0)
  }

  handleSpecialistBriefResponseSubmit(values) {
    const { model } = this.props
    const submitData = {
      attachedDocumentURL: values.attachedDocumentURL ? values.attachedDocumentURL : null,
      availability: values.availability,
      specialistName: values.specialistName ? values.specialistName : null,
      dayRate: values.dayRate,
      essentialRequirements: values.essentialRequirements,
      niceToHaveRequirements: values.niceToHaveRequirements ? values.niceToHaveRequirements : null,
      respondToEmailAddress: values.respondToEmailAddress ? values.respondToEmailAddress : null
    }
    if (values.addAnother) {
      this.props.handleBriefNameSubmit('')
      this.props.handleSpecialistNumberSubmit(1)
    }

    const { brief } = this.props
    this.props.addAnotherSpecialistSubmit(values.addAnother)
    this.props.handleBriefResponseSubmit(brief.id, submitData)
    this.props.clearModel(model)
    window.scrollTo(0, 0)
  }

  handleBriefNameSubmit = name => {
    this.props.handleBriefNameSubmit(name)
    this.props.setInitial(this.props.model)
    window.scrollTo(0, 0)
  }

  handleSpecialistBriefResponseSubmit(values) {
    const { model } = this.props
    const submitData = {
      attachedDocumentURL: values.attachedDocumentURL ? values.attachedDocumentURL : null,
      availability: values.availability,
      specialistName: values.specialistName ? values.specialistName : null,
      dayRate: values.dayRate,
      essentialRequirements: values.essentialRequirements,
      niceToHaveRequirements: values.niceToHaveRequirements ? values.niceToHaveRequirements : null
    }
    if (values.addAnother) {
      this.props.handleBriefNameSubmit('')
      this.props.handleSpecialistNumberSubmit(1)
    }

    const { brief } = this.props
    this.props.addAnotherSpecialistSubmit(values.addAnother)
    this.props.handleBriefResponseSubmit(brief.id, submitData)
    this.props.clearModel(model)
    window.scrollTo(0, 0)
  }

  handleBriefNameSubmit = name => {
    this.props.handleBriefNameSubmit(name)
    window.scrollTo(0, 0)
  }

  render() {
    const { currentlySending, loadBriefSuccess, match } = this.props

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    if (currentlySending) {
      return <LoadingIndicatorFullPage />
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
            path={`${match.url}/specialist/respond/submitted`}
            render={() =>
              <BriefSpecialistResponseSubmitted
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
                      handleSubmit={values => this.handleBriefResponseSubmit(values)}
                      setFocus={setFocus}
                      {...this.props}
                    />
                  : <ErrorBox title="There was a problem loading the brief details" setFocus={setFocus} />}{' '}
              </span>}
          />
          <Route
            path={`${match.url}/specialist/respond`}
            render={() =>
              <span>
                {loadBriefSuccess
                  ? <BriefSpecialistResponseForm
                      submitClicked={this.onSpecialistSubmitClicked}
                      addAnotherClicked={this.onAddAnotherClicked}
                      handleNameSubmit={name => this.handleBriefNameSubmit(name)}
                      handleSubmit={values => this.handleSpecialistBriefResponseSubmit(values)}
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
  briefResponses: state.brief.briefResponses,
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
  addAnotherSpecialistSubmit: bool => dispatch(addAnotherSpecialistSubmit(bool)),
  clearModel: model => dispatch(actions.reset(model)),
  changeModel: (model, value) => dispatch(actions.change(model, value))
})

export default withRouter(connect(mapResetStateToProps, mapResetDispatchToProps)(BriefPage))
