import React, { Component } from 'react'
import { actions } from 'react-redux-form'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import AUheading from '@gov.au/headings/lib/js/react.js'
import formProps from 'shared/form/formPropsSelector'
import ErrorBox from 'shared/form/ErrorBox'
import BriefSpecialistResponseForm2 from 'marketplace/components/Brief/BriefSpecialistResponseForm2'
import BriefSpecialistResponseSubmitted2 from 'marketplace/components/Brief/BriefSpecialistResponseSubmitted2'
import BriefRFXResponseForm from 'marketplace/components/Brief/BriefRFXResponseForm'
import BriefRFXResponseSubmitted from 'marketplace/components/Brief/BriefRFXResponseSubmitted'
import BriefATMResponseForm from 'marketplace/components/Brief/BriefATMResponseForm'
import BriefATMResponseSubmitted from 'marketplace/components/Brief/BriefATMResponseSubmitted'
import BriefTrainingResponseForm2 from 'marketplace/components/Brief/BriefTrainingResponseForm2'
import BriefTrainingResponseSubmitted2 from 'marketplace/components/Brief/BriefTrainingResponseSubmitted2'
import BriefResponseSupplierError from 'marketplace/components/Brief/BriefResponseSupplierError'
import {
  loadBrief,
  resetBriefResponseSuccess,
  loadBriefResponse,
  handleSaveBriefResponse,
  saveBriefResponse,
  resetBriefResponseSave,
  handleBriefNameSubmit,
  handleBriefNameSplitSubmit,
  handleSpecialistNumberSubmit,
  deleteBriefResponse
} from 'marketplace/actions/briefActions'
import { setErrorMessage, handleFeedbackSubmit } from 'marketplace/actions/appActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { BriefResponseSpecialistReducer, BriefResponseRFXReducer, BriefResponseATMReducer } from 'marketplace/reducers'
import { rootPath } from 'marketplace/routes'

const model = 'briefResponseForm'

const mapResponseTypeToReducer = {
  specialist2: BriefResponseSpecialistReducer,
  rfx: BriefResponseRFXReducer,
  training2: BriefResponseRFXReducer,
  atm: BriefResponseATMReducer
}

class BriefResponsePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingText: null,
      otherDocumentFileCount: 0,
      loading: true,
      submitClicked: null,
      responseDeleted: false
    }

    this.handleBriefResponseDelete = this.handleBriefResponseDelete.bind(this)
  }

  componentDidMount() {
    const briefId = this.props.match.params.briefId
    const briefResponseId = this.props.match.params.briefResponseId
    const briefResponseType = this.props.match.params.briefResponseType
    if (briefId && briefResponseId) {
      this.resetForm()
      this.props.loadInitialData(briefId).then(briefResponse => {
        if (briefResponse.data.brief.status !== 'live') {
          this.props.setError(`Edits can't be made on a ${briefResponse.data.brief.status} opportunity`)
          this.setState({ loading: false })
          return true
        }
        return this.props.loadBriefResponse(briefResponseId).then(response => {
          const data = { ...mapResponseTypeToReducer[briefResponseType] }
          if (response.data) {
            Object.keys(response.data).map(property => {
              if (Object.keys(mapResponseTypeToReducer[briefResponseType]).includes(property)) {
                data[property] = response.data[property]
              }
              return true
            })

            if (response.data.status === 'withdrawn') {
              this.props.setError("You can't edit withdrawn responses.")
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
      })
    }
  }

  handleSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
    this.props.changeModel(`${this.props.model}.submit`, true)
  }

  handleSaveClicked = () => {
    this.props.changeModel(`${this.props.model}.submit`, false)
    this.handleBriefResponseSubmit(this.props[this.props.model], false)
  }

  handleBriefResponseDelete(id) {
    this.setState({
      loading: true
    })
    this.props.deleteBriefResponse(id).then(response => {
      if (response.status === 200) {
        this.setState({
          loading: false,
          responseDeleted: true
        })
      }
    })
  }

  handleFeedbackSubmit(values) {
    this.props.handleFeedbackSubmit({
      timeToComplete: this.state.submitClicked ? this.state.submitClicked - this.props.loadedAt : null,
      object_id: this.props.match.params.briefId,
      object_type: 'Brief',
      userType: this.props.app.userType,
      ...values
    })
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

  handleBriefResponseSubmit(values, submit = true) {
    const { brief, match } = this.props
    const briefResponseType = match.params.briefResponseType
    const submitData = { ...mapResponseTypeToReducer[briefResponseType] }
    Object.keys(values).map(property => {
      if (Object.keys(mapResponseTypeToReducer[briefResponseType]).includes(property)) {
        submitData[property] = values[property]
      }
      return true
    })
    submitData.submit = submit
    if (!submit) {
      this.props.handleSaveBriefResponse()
    }
    this.props.saveBriefResponse(brief.id, match.params.briefResponseId, submitData)
    window.scrollTo(0, 0)
  }

  resetForm() {
    this.props.resetBriefResponseSuccess()
    this.props.resetBriefResponseSave()
  }

  render() {
    const { loadBriefSuccess, briefResponseSave, briefResponse, match, app } = this.props
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
        <ErrorBox title="There is a problem" setFocus={setFocus} />
      )

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.state.responseDeleted) {
      return (
        <React.Fragment>
          <AUheading level="1" size="xl">
            Application withdrawn
          </AUheading>
          <p>You have successfully withdrawn your application.</p>
          <p>
            <a href={`${rootPath}/seller-dashboard`} className="au-btn">
              Return to dashboard
            </a>
          </p>
        </React.Fragment>
      )
    }

    if (app.errorMessage) {
      return errorScreen
    }

    return (
      <div className="brief-page">
        <Switch>
          <Route
            path={`${baseURL}/specialist2/respond/${briefResponseId}/submitted`}
            render={() => (
              <BriefSpecialistResponseSubmitted2
                setFocus={setFocus}
                briefResponsePreviousStatus={briefResponse.previous_status}
                submitClicked={this.state.submitClicked}
                handleSubmit={values => this.handleFeedbackSubmit(values)}
                {...this.props}
              />
            )}
          />
          <Route
            path={`${baseURL}/specialist2/respond/${briefResponseId}`}
            render={() => (
              <React.Fragment>
                {loadBriefSuccess ? (
                  <BriefSpecialistResponseForm2
                    briefResponseSave={briefResponseSave}
                    briefResponseId={briefResponseId}
                    briefResponseStatus={briefResponse.status}
                    onSubmitClicked={this.handleSubmitClicked}
                    onSaveClicked={this.handleSaveClicked}
                    handleSubmit={values => this.handleBriefResponseSubmit(values)}
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
              </React.Fragment>
            )}
          />
          <Route
            path={`${baseURL}/rfx/respond/${briefResponseId}/submitted`}
            render={() => (
              <BriefRFXResponseSubmitted
                setFocus={setFocus}
                briefResponsePreviousStatus={briefResponse.previous_status}
                briefResponseId={briefResponseId}
                briefId={this.props.brief.id}
                submitClicked={this.state.submitClicked}
                handleSubmit={values => this.handleFeedbackSubmit(values)}
                {...this.props}
              />
            )}
          />
          <Route
            path={`${baseURL}/rfx/respond/${briefResponseId}`}
            render={() => (
              <React.Fragment>
                {loadBriefSuccess ? (
                  <BriefRFXResponseForm
                    onBriefResponseDelete={this.handleBriefResponseDelete}
                    onSubmitClicked={this.handleSubmitClicked}
                    onSaveClicked={this.handleSaveClicked}
                    briefResponseSave={briefResponseSave}
                    briefResponseId={briefResponseId}
                    briefResponseStatus={briefResponse.status}
                    handleSubmit={values => this.handleBriefResponseSubmit(values)}
                    setFocus={setFocus}
                    {...this.props}
                    loadingText={this.state.loadingText}
                    uploading={uploading => this.setState({ loadingText: uploading ? 'Uploading' : null })}
                  />
                ) : (
                  errorScreen
                )}
              </React.Fragment>
            )}
          />
          <Route
            path={`${baseURL}/atm/respond/${briefResponseId}/submitted`}
            render={() => (
              <BriefATMResponseSubmitted
                setFocus={setFocus}
                briefResponsePreviousStatus={briefResponse.previous_status}
                briefResponseId={briefResponseId}
                briefId={this.props.brief.id}
                submitClicked={this.state.submitClicked}
                handleSubmit={values => this.handleFeedbackSubmit(values)}
                {...this.props}
              />
            )}
          />
          <Route
            path={`${baseURL}/atm/respond/${briefResponseId}`}
            render={() => (
              <span>
                {loadBriefSuccess ? (
                  <BriefATMResponseForm
                    onBriefResponseDelete={this.handleBriefResponseDelete}
                    onSubmitClicked={this.handleSubmitClicked}
                    onSaveClicked={this.handleSaveClicked}
                    briefResponseSave={briefResponseSave}
                    briefResponseId={briefResponseId}
                    briefResponseStatus={briefResponse.status}
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
            path={`${baseURL}/training2/respond/${briefResponseId}/submitted`}
            render={() => (
              <BriefTrainingResponseSubmitted2
                setFocus={setFocus}
                briefResponsePreviousStatus={briefResponse.previous_status}
                briefResponseId={briefResponseId}
                briefId={this.props.brief.id}
                submitClicked={this.state.submitClicked}
                handleSubmit={values => this.handleFeedbackSubmit(values)}
                {...this.props}
              />
            )}
          />
          <Route
            path={`${baseURL}/training2/respond/${briefResponseId}`}
            render={() => (
              <span>
                {loadBriefSuccess ? (
                  <BriefTrainingResponseForm2
                    onBriefResponseDelete={this.handleBriefResponseDelete}
                    onSubmitClicked={this.handleSubmitClicked}
                    onSaveClicked={this.handleSaveClicked}
                    briefResponseSave={briefResponseSave}
                    briefResponseId={briefResponseId}
                    briefResponseStatus={briefResponse.status}
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
  briefResponseSave: state.brief.briefResponseSave
})

const mapDispatchToProps = dispatch => ({
  handleFeedbackSubmit: data => dispatch(handleFeedbackSubmit(data)),
  handleSaveBriefResponse: () => dispatch(handleSaveBriefResponse()),
  deleteBriefResponse: briefResponseId => dispatch(deleteBriefResponse(briefResponseId)),
  resetBriefResponseSuccess: () => dispatch(resetBriefResponseSuccess()),
  resetBriefResponseSave: () => dispatch(resetBriefResponseSave()),
  loadBriefResponse: briefResponseId => dispatch(loadBriefResponse(briefResponseId)),
  saveBriefResponse: (briefId, briefResponseId, data) => dispatch(saveBriefResponse(briefId, briefResponseId, data)),
  loadInitialData: briefId => dispatch(loadBrief(briefId)),
  handleBriefNameSubmit: name => dispatch(handleBriefNameSubmit(name)),
  handleBriefNameSplitSubmit: (givenNames, surname) => dispatch(handleBriefNameSplitSubmit(givenNames, surname)),
  handleSpecialistNumberSubmit: number => dispatch(handleSpecialistNumberSubmit(number)),
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
