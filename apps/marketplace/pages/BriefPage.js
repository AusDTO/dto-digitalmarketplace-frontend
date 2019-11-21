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
import BriefSpecialistResponseForm2 from 'marketplace/components/Brief/BriefSpecialistResponseForm2'
import BriefTrainingResponseForm from 'marketplace/components/Brief/BriefTrainingResponseForm'
import BriefTrainingResponseSubmitted from 'marketplace/components/Brief/BriefTrainingResponseSubmitted'
import BriefRFXResponseForm from 'marketplace/components/Brief/BriefRFXResponseForm'
import BriefRFXResponseSubmitted from 'marketplace/components/Brief/BriefRFXResponseSubmitted'
import BriefTrainingResponseForm2 from 'marketplace/components/Brief/BriefTrainingResponseForm2'
import BriefTrainingResponseSubmitted2 from 'marketplace/components/Brief/BriefTrainingResponseSubmitted2'
import BriefATMResponseForm from 'marketplace/components/Brief/BriefATMResponseForm'
import BriefATMResponseSubmitted from 'marketplace/components/Brief/BriefATMResponseSubmitted'
import BriefDownloadResponses from 'marketplace/components/Brief/BriefDownloadResponses'
import BriefDownloadWorkOrder from 'marketplace/components/Brief/BriefDownloadWorkOrder'
import {
  loadBrief,
  handleBriefResponseSubmit,
  handleBriefNameSubmit,
  handleBriefNameSplitSubmit,
  addAnotherSpecialistSubmit,
  handleSpecialistNumberSubmit
} from 'marketplace/actions/briefActions'
import { handleFeedbackSubmit } from 'marketplace/actions/appActions'
import BriefSpecialistResponseSubmitted from 'marketplace/components/Brief/BriefSpecialistResponseSubmitted'
import BriefSpecialistResponseSubmitted2 from 'marketplace/components/Brief/BriefSpecialistResponseSubmitted2'
import BriefSubmitted from 'marketplace/components/Brief/BriefSubmitted'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import BriefResponseSubmitted from 'marketplace/components/Brief/BriefResponseSubmitted'
import BriefResponseSupplierError from 'marketplace/components/Brief/BriefResponseSupplierError'

class BriefPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null,
      loadingText: null,
      otherDocumentFileCount: 2
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
      availability: values.availability ? values.availability : null,
      specialistName: values.specialistName ? values.specialistName : null,
      specialistGivenNames: values.specialistGivenNames ? values.specialistGivenNames : null,
      specialistSurname: values.specialistSurname ? values.specialistSurname : null,
      dayRate: values.dayRate ? values.dayRate : null,
      dayRateExcludingGST: values.dayRateExcludingGST ? values.dayRateExcludingGST : null,
      hourRate: values.hourRate ? values.hourRate : null,
      hourRateExcludingGST: values.hourRateExcludingGST ? values.hourRateExcludingGST : null,
      essentialRequirements: values.essentialRequirements,
      niceToHaveRequirements: values.niceToHaveRequirements ? values.niceToHaveRequirements : null,
      respondToEmailAddress: values.respondToEmailAddress ? values.respondToEmailAddress : null,
      visaStatus: values.visaStatus ? values.visaStatus : null,
      securityClearance: values.securityClearance ? values.securityClearance : null,
      previouslyWorked: values.previouslyWorked ? values.previouslyWorked : null
    }
    if (values.addAnother) {
      if (values.specialistName) {
        this.props.handleBriefNameSubmit('')
      } else if (values.specialistSurname && values.specialistGivenNames) {
        this.props.handleBriefNameSplitSubmit('', '')
      }

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

  handleBriefNameSplitSubmit = (givenNames, surname) => {
    this.props.handleBriefNameSplitSubmit(givenNames, surname)
    this.props.setInitial(this.props.model)
    window.scrollTo(0, 0)
  }

  showTrainingResumesFileUpload = () =>
    typeof this.props.brief.evaluationTypeSellerSubmissions !== 'undefined' &&
    this.props.brief.evaluationTypeSellerSubmissions.includes('Trainer résumés')

  render() {
    const { currentlySending, loadBriefSuccess, match, app } = this.props

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }
    const errorScreen =
      !loadBriefSuccess && Array.isArray(app.errorMessage) ? (
        <BriefResponseSupplierError setFocus={setFocus} {...this.props} />
      ) : (
        <ErrorBox title="There was a problem loading the brief details" setFocus={setFocus} />
      )

    return (
      <div className="brief-page">
        {currentlySending ? (
          <LoadingIndicatorFullPage />
        ) : (
          <Switch>
            <Route
              path={`${match.url}/published`}
              render={() => (
                <BriefSubmitted
                  setFocus={setFocus}
                  submitClicked={this.state.submitClicked}
                  handleSubmit={values => this.handleFeedbackSubmit(values)}
                  {...this.props}
                />
              )}
            />
            <Route
              path={`${match.url}/specialist/respond/submitted`}
              render={() => (
                <BriefSpecialistResponseSubmitted
                  setFocus={setFocus}
                  submitClicked={this.state.submitClicked}
                  handleSubmit={values => this.handleFeedbackSubmit(values)}
                  {...this.props}
                />
              )}
            />
            <Route
              path={`${match.url}/specialist2/respond/submitted`}
              render={() => (
                <BriefSpecialistResponseSubmitted2
                  setFocus={setFocus}
                  submitClicked={this.state.submitClicked}
                  handleSubmit={values => this.handleFeedbackSubmit(values)}
                  {...this.props}
                />
              )}
            />
            <Route
              path={`${match.url}/respond/submitted`}
              render={() => (
                <BriefResponseSubmitted
                  setFocus={setFocus}
                  submitClicked={this.state.submitClicked}
                  handleSubmit={values => this.handleFeedbackSubmit(values)}
                  {...this.props}
                />
              )}
            />
            <Route
              path={`${match.url}/respond`}
              render={() => (
                <span>
                  {loadBriefSuccess ? (
                    <BriefResponseForm
                      submitClicked={this.onSubmitClicked}
                      handleSubmit={values => this.handleBriefResponseSubmit(values)}
                      setFocus={setFocus}
                      {...this.props}
                      loadingText={this.state.loadingText}
                      uploading={uploading => this.setState({ loadingText: uploading ? 'Uploading' : null })}
                    />
                  ) : (
                    errorScreen
                  )}{' '}
                </span>
              )}
            />
            <Route
              path={`${match.url}/specialist/respond`}
              render={() => (
                <span>
                  {loadBriefSuccess ? (
                    <BriefSpecialistResponseForm
                      submitClicked={this.onSpecialistSubmitClicked}
                      addAnotherClicked={this.onAddAnotherClicked}
                      handleNameSubmit={name => this.handleBriefNameSubmit(name)}
                      handleSubmit={values => this.handleSpecialistBriefResponseSubmit(values)}
                      setFocus={setFocus}
                      loadingText={this.state.loadingText}
                      uploading={uploading => this.setState({ loadingText: uploading ? 'Uploading' : null })}
                      {...this.props}
                    />
                  ) : (
                    errorScreen
                  )}{' '}
                </span>
              )}
            />
            <Route
              path={`${match.url}/specialist2/respond`}
              render={() => (
                <span>
                  {loadBriefSuccess ? (
                    <BriefSpecialistResponseForm2
                      submitClicked={this.onSpecialistSubmitClicked}
                      addAnotherClicked={this.onAddAnotherClicked}
                      handleNameSubmit={(givenNames, surname) => this.handleBriefNameSplitSubmit(givenNames, surname)}
                      handleSubmit={values => this.handleSpecialistBriefResponseSubmit(values)}
                      setFocus={setFocus}
                      loadingText={this.state.loadingText}
                      uploading={uploading => this.setState({ loadingText: uploading ? 'Uploading' : null })}
                      onRateChange={(field, value) => {
                        let withGst = parseFloat(value * 1.1).toFixed(2)
                        if (isNaN(withGst)) {
                          withGst = ''
                        }
                        this.props.changeModel(`${this.props.model}.${field}`, `${withGst}`)
                      }}
                      fileCount={this.state.otherDocumentFileCount}
                      addOtherDocument={() => {
                        this.setState(curState => {
                          const newState = { ...curState }
                          newState.otherDocumentFileCount += 1
                          return newState
                        })
                      }}
                      {...this.props}
                    />
                  ) : (
                    errorScreen
                  )}{' '}
                </span>
              )}
            />
            <Route
              path={`${match.url}/training/respond/submitted`}
              render={() => (
                <BriefTrainingResponseSubmitted
                  setFocus={setFocus}
                  submitClicked={this.state.submitClicked}
                  handleSubmit={values => this.handleFeedbackSubmit(values)}
                  {...this.props}
                />
              )}
            />
            <Route
              path={`${match.url}/training/respond`}
              render={() => (
                <span>
                  {loadBriefSuccess ? (
                    <BriefTrainingResponseForm
                      submitClicked={this.onSubmitClicked}
                      handleSubmit={values => this.handleBriefResponseSubmit(values)}
                      setFocus={setFocus}
                      showTrainerResumes={this.showTrainingResumesFileUpload()}
                      {...this.props}
                      loadingText={this.state.loadingText}
                      uploading={uploading => this.setState({ loadingText: uploading ? 'Uploading' : null })}
                    />
                  ) : (
                    errorScreen
                  )}{' '}
                </span>
              )}
            />
            <Route
              path={`${match.url}/training2/respond/submitted`}
              render={() => (
                <BriefTrainingResponseSubmitted2
                  setFocus={setFocus}
                  submitClicked={this.state.submitClicked}
                  handleSubmit={values => this.handleFeedbackSubmit(values)}
                  {...this.props}
                />
              )}
            />
            <Route
              path={`${match.url}/training2/respond`}
              render={() => (
                <span>
                  {loadBriefSuccess ? (
                    <BriefTrainingResponseForm2
                      submitClicked={this.onSubmitClicked}
                      handleSubmit={values => this.handleBriefResponseSubmit(values)}
                      setFocus={setFocus}
                      {...this.props}
                      loadingText={this.state.loadingText}
                      uploading={uploading => this.setState({ loadingText: uploading ? 'Uploading' : null })}
                    />
                  ) : (
                    errorScreen
                  )}{' '}
                </span>
              )}
            />
            <Route
              path={`${match.url}/rfx/respond/submitted`}
              render={() => (
                <BriefRFXResponseSubmitted
                  setFocus={setFocus}
                  submitClicked={this.state.submitClicked}
                  handleSubmit={values => this.handleFeedbackSubmit(values)}
                  {...this.props}
                />
              )}
            />
            <Route
              path={`${match.url}/rfx/respond`}
              render={() => (
                <span>
                  {loadBriefSuccess ? (
                    <BriefRFXResponseForm
                      submitClicked={this.onSubmitClicked}
                      handleSubmit={values => this.handleBriefResponseSubmit(values)}
                      setFocus={setFocus}
                      {...this.props}
                      loadingText={this.state.loadingText}
                      uploading={uploading => this.setState({ loadingText: uploading ? 'Uploading' : null })}
                    />
                  ) : (
                    errorScreen
                  )}{' '}
                </span>
              )}
            />
            <Route
              path={`${match.url}/atm/respond/submitted`}
              render={() => (
                <BriefATMResponseSubmitted
                  setFocus={setFocus}
                  submitClicked={this.state.submitClicked}
                  handleSubmit={values => this.handleFeedbackSubmit(values)}
                  {...this.props}
                />
              )}
            />
            <Route
              path={`${match.url}/atm/respond`}
              render={() => (
                <span>
                  {loadBriefSuccess ? (
                    <BriefATMResponseForm
                      submitClicked={this.onSubmitClicked}
                      handleSubmit={values => this.handleBriefResponseSubmit(values)}
                      setFocus={setFocus}
                      {...this.props}
                      loadingText={this.state.loadingText}
                      uploading={uploading => this.setState({ loadingText: uploading ? 'Uploading' : null })}
                    />
                  ) : (
                    errorScreen
                  )}{' '}
                </span>
              )}
            />
            <Route
              path={`${match.url}/download-responses`}
              render={() => (
                <span>
                  {!app.errorMessage && loadBriefSuccess ? (
                    <BriefDownloadResponses
                      brief={this.props.brief}
                      briefResponses={this.props.briefResponses}
                      briefResponseDownloaded={this.props.briefResponseDownloaded}
                      onDownloadBrief={() => this.props.loadInitialData(this.props.brief.id)}
                    />
                  ) : (
                    <ErrorBox title="There was a problem downloading the documents" setFocus={setFocus} />
                  )}{' '}
                </span>
              )}
            />
            <Route
              path={`${match.url}/download-work-order`}
              render={() => (
                <span>
                  {!app.errorMessage && loadBriefSuccess ? (
                    <BriefDownloadWorkOrder brief={this.props.brief} />
                  ) : (
                    <ErrorBox title="There was a problem loading the brief" setFocus={setFocus} />
                  )}{' '}
                </span>
              )}
            />
            <Route component={NotFound} />
          </Switch>
        )}
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
  briefResponseDownloaded: state.brief.briefResponseDownloaded,
  supplierContact: state.brief.supplierContact,
  loadedAt: state.brief.loadedAt,
  app: state.app,
  supplierCode: state.app.supplierCode,
  loadBriefSuccess: state.brief.loadBriefSuccess,
  briefResponseSuccess: state.brief.briefResponseSuccess,
  currentlySending: state.app.currentlySending,
  specialistGivenNames: state.brief.specialistGivenNames,
  specialistSurname: state.brief.specialistSurname,
  specialistName: state.brief.specialistName,
  specialistNumber: state.brief.specialistNumber,
  addAnotherSpecialist: state.brief.addAnotherSpecialist
})

const mapResetDispatchToProps = dispatch => ({
  handleFeedbackSubmit: model => dispatch(handleFeedbackSubmit(model)),
  handleBriefResponseSubmit: (briefId, model) => dispatch(handleBriefResponseSubmit(briefId, model)),
  loadInitialData: briefId => dispatch(loadBrief(briefId)),
  handleBriefNameSubmit: name => dispatch(handleBriefNameSubmit(name)),
  handleBriefNameSplitSubmit: (givenNames, surname) => dispatch(handleBriefNameSplitSubmit(givenNames, surname)),
  handleSpecialistNumberSubmit: number => dispatch(handleSpecialistNumberSubmit(number)),
  addAnotherSpecialistSubmit: bool => dispatch(addAnotherSpecialistSubmit(bool)),
  clearModel: model => dispatch(actions.reset(model)),
  changeModel: (model, value) => dispatch(actions.change(model, value)),
  setInitial: model => dispatch(actions.setInitial(model))
})

export default withRouter(
  connect(
    mapResetStateToProps,
    mapResetDispatchToProps
  )(BriefPage)
)
