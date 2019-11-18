import React, { Component } from 'react'
import { actions } from 'react-redux-form'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import formProps from 'shared/form/formPropsSelector'
import ErrorBox from 'shared/form/ErrorBox'
import BriefSpecialistResponseForm2 from 'marketplace/components/Brief/BriefSpecialistResponseForm2'
import BriefSpecialistResponseSubmitted2 from 'marketplace/components/Brief/BriefSpecialistResponseSubmitted2'
import BriefResponseSupplierError from 'marketplace/components/Brief/BriefResponseSupplierError'
import {
  loadBrief,
  handleBriefResponseSubmit,
  resetBriefResponseSuccess,
  loadBriefResponse,
  handleSaveBriefResponse,
  saveBriefResponse,
  resetBriefResponseSave,
  handleBriefNameSubmit,
  handleBriefNameSplitSubmit,
  addAnotherSpecialistSubmit,
  handleSpecialistNumberSubmit
} from 'marketplace/actions/briefActions'
import { setErrorMessage, handleFeedbackSubmit } from 'marketplace/actions/appActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { BriefResponseSpecialistReducer } from 'marketplace/reducers'

const model = 'briefResponseForm'

const mapResponseTypeToReducer = {
  specialist2: BriefResponseSpecialistReducer
}

const getSubmittedResponses = responses => responses.filter(response => response.status === 'submitted')

class BriefResponsePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingText: null,
      otherDocumentFileCount: 2,
      loading: true
    }
  }

  componentDidMount() {
    const briefId = this.props.match.params.briefId
    const briefResponseId = this.props.match.params.briefResponseId
    const briefResponseType = this.props.match.params.briefResponseType
    if (briefId && briefResponseId) {
      this.resetForm()
      this.props.loadInitialData(briefId).then(
        this.props.loadBriefResponse(briefResponseId).then(response => {
          const data = { ...mapResponseTypeToReducer[briefResponseType] }
          if (response.data) {
            Object.keys(response.data).map(property => {
              if (Object.keys(mapResponseTypeToReducer[briefResponseType]).includes(property)) {
                data[property] = response.data[property]
              }
              return true
            })

            if (response.data.status === 'withdrawn') {
              this.props.setError("You can't edit withdrawn brief responses.")
            }

            this.props.replaceModel(data)

            if (data.attachedDocumentURL.length > 0) {
              this.setState({
                otherDocumentFileCount: data.attachedDocumentURL.length
              })
            }
          }
          this.setState({ loading: false })
        })
      )
    }
  }

  onAddAnotherClicked = () => {
    this.props.changeModel(`${this.props.model}.submit`, true)
    this.props.changeModel(`${this.props.model}.addAnother`, true)
  }

  onSpecialistSubmitClicked = () => {
    this.props.changeModel(`${this.props.model}.submit`, true)
    this.props.changeModel(`${this.props.model}.addAnother`, false)
  }

  onSaveClicked = () => {
    switch (this.props.match.params.briefResponseType) {
      case 'specialist2':
        this.props.changeModel(`${this.props.model}.submit`, false)
        this.props.changeModel(`${this.props.model}.addAnother`, false)
        this.handleSpecialistBriefResponseSubmit(this.props[this.props.model])
        break
      default:
        break
    }
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

  handleSpecialistBriefResponseSubmit(values) {
    const submitData = {
      submit: values.submit,
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
    if (!values.submit) {
      this.props.handleSaveBriefResponse()
    }
    this.props.saveBriefResponse(brief.id, this.props.match.params.briefResponseId, submitData)
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

  resetForm() {
    this.props.addAnotherSpecialistSubmit(false)
    this.props.resetBriefResponseSuccess()
    this.props.resetBriefResponseSave()
  }

  render() {
    const { loadBriefSuccess, briefResponseSave, match, app } = this.props
    const baseURL = match.url
      .split('/')
      .splice(0, 4)
      .join('/')
    const briefResponseId = match.params.briefResponseId
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

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    return (
      <div className="brief-page">
        <Switch>
          <Route
            path={`${baseURL}/specialist2/respond/${briefResponseId}/submitted`}
            render={() => (
              <BriefSpecialistResponseSubmitted2
                setFocus={setFocus}
                briefResponseStatus={this.props.briefResponse.status}
                getSubmittedResponses={getSubmittedResponses}
                submitClicked={this.state.submitClicked}
                handleSubmit={values => this.handleFeedbackSubmit(values)}
                {...this.props}
              />
            )}
          />
          <Route
            path={`${baseURL}/specialist2/respond/${briefResponseId}`}
            render={() => (
              <span>
                {loadBriefSuccess ? (
                  <BriefSpecialistResponseForm2
                    briefResponseSave={briefResponseSave}
                    briefResponseId={briefResponseId}
                    submitClicked={this.onSpecialistSubmitClicked}
                    saveClicked={this.onSaveClicked}
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
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...formProps(state, model),
  brief: state.brief.brief,
  briefResponses: state.brief.briefResponses,
  briefResponse: state.brief.briefResponse,
  briefResponseDownloaded: state.brief.briefResponseDownloaded,
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
  addAnotherSpecialist: state.brief.addAnotherSpecialist,
  briefResponseSave: state.brief.briefResponseSave
})

const mapDispatchToProps = dispatch => ({
  handleFeedbackSubmit: data => dispatch(handleFeedbackSubmit(data)),
  handleBriefResponseSubmit: (briefId, data) => dispatch(handleBriefResponseSubmit(briefId, data)),
  handleSaveBriefResponse: () => dispatch(handleSaveBriefResponse()),
  resetBriefResponseSuccess: () => dispatch(resetBriefResponseSuccess()),
  resetBriefResponseSave: () => dispatch(resetBriefResponseSave()),
  loadBriefResponse: briefResponseId => dispatch(loadBriefResponse(briefResponseId)),
  saveBriefResponse: (briefId, briefResponseId, data) => dispatch(saveBriefResponse(briefId, briefResponseId, data)),
  loadInitialData: briefId => dispatch(loadBrief(briefId)),
  handleBriefNameSubmit: name => dispatch(handleBriefNameSubmit(name)),
  handleBriefNameSplitSubmit: (givenNames, surname) => dispatch(handleBriefNameSplitSubmit(givenNames, surname)),
  handleSpecialistNumberSubmit: number => dispatch(handleSpecialistNumberSubmit(number)),
  addAnotherSpecialistSubmit: bool => dispatch(addAnotherSpecialistSubmit(bool)),
  clearModel: data => dispatch(actions.reset(data)),
  changeModel: (data, value) => dispatch(actions.change(data, value)),
  replaceModel: data => dispatch(actions.merge(model, data)),
  setInitial: data => dispatch(actions.setInitial(data)),
  setError: message => dispatch(setErrorMessage(message))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BriefResponsePage)
)
