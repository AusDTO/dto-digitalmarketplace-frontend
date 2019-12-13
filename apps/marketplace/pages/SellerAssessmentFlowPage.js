import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import formProps from 'shared/form/formPropsSelector'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import ProgressFlow from 'marketplace/components/ProgressFlow/ProgressFlow'
import SellerAssessmentStages from 'marketplace/components/SellerAssessment/SellerAssessmentStages'
import SellerAssessmentHybridStages from 'marketplace/components/SellerAssessment/Hybrid/SellerAssessmentHybridStages'
import { rootPath } from 'marketplace/routes'
import { loadDomainData, loadEvidenceData, saveEvidence } from 'marketplace/actions/supplierActions'
import { setErrorMessage } from 'marketplace/actions/appActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { SellerAssessmentFormReducer, SellerAssessmentEvidenceReducer } from 'marketplace/reducers'

const model = 'SellerAssessmentForm'

export class SellerAssessmentFlowPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      flowIsDone: false
    }

    this.saveEvidence = this.saveEvidence.bind(this)
    this.handleStageMount = this.handleStageMount.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.evidenceId) {
      this.getEvidenceData().then(data => this.getDomainData(data.domainId))
    }
  }

  getDomainData(domainId) {
    if (domainId) {
      this.setState({
        loading: true
      })
      this.props.loadDomainData(domainId).then(() => this.setState({ loading: false }))
    }
  }
  //reshma
  getEvidenceData() {
    this.setState({
      loading: true
    })
    return this.props.loadInitialData(this.props.match.params.evidenceId).then(response => {
      // only accept data defined in the form reducer
      const data = { ...SellerAssessmentFormReducer }
      if (response.data && !response.error) {
        if (response.data.status !== 'draft') {
          this.props.setError('You can not edit submitted or approved assessments.')
          return false
        }

        Object.keys(response.data).map(property => {
          if (Object.keys(SellerAssessmentFormReducer).includes(property)) {
            data[property] = response.data[property]
          }
          return true
        })

        // pre-populate the evidence model with the selected criteria if it doesn't yet exist
        if (data.criteria && data.criteria.length > 0 && data.evidence) {
          data.criteria.map(criteriaId => {
            if (!(criteriaId in data.evidence)) {
              data.evidence[criteriaId] = { ...SellerAssessmentEvidenceReducer }
            }
            return true
          })
        }

        this.props.changeFormModel(data)
      } else {
        this.props.setError('Failed to load the evidence - invalid id')
      }

      this.setState({
        loading: false
      })

      return data
    })
  }

  saveEvidence(publish = false) {
    if (publish) {
      this.setState({
        loading: true
      })
    }
    const data = { ...this.props[model] }
    data.publish = publish
    return this.props.saveEvidence(this.props.match.params.evidenceId, data).then(response => {
      if (response.status === 200 && publish) {
        this.setState({
          flowIsDone: true,
          loading: false
        })
      }
    })
  }

  handleStageMount() {
    this.props.resetFormValidity()
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
          title="A problem occurred when loading the assessment details"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    const evidenceId = this.props.match.params.evidenceId


    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.state.flowIsDone) {
      return <Redirect to={`${rootPath}/seller-assessment/${evidenceId}/completed`} push />
    }

      if (this.props.isRecruiterFlag) {
        return (
          <ProgressFlow
            model={model}
            meta={{ domain: this.props.domain, evidence: this.props.evidence }}
            onStageMount={this.handleStageMount}
            basename={`${rootPath}/seller-assessment/${evidenceId}`}
            stages={SellerAssessmentHybridStages}
            saveModel={this.saveEvidence}
            showReturnButton={false}
            showReviewButton={false}
            publishText="Request assessment"
            showConfirmationCheckbox={false}
          />
        )
      }

    return (
      <ProgressFlow
        model={model}
        meta={{ domain: this.props.domain, evidence: this.props.evidence }}
        onStageMount={this.handleStageMount}
        basename={`${rootPath}/seller-assessment/${evidenceId}`}
        stages={SellerAssessmentStages}
        saveModel={this.saveEvidence}
        showReturnButton={false}
        showReviewButton={false}
        publishText="Request assessment"
        showConfirmationCheckbox={false}
      />
    )
  }
 }

const mapStateToProps = state => ({
  ...formProps(state, model),
  domain: state.domain.domain,
  evidence: state.evidence,
  errorMessage: state.app.errorMessage,
  isRecruiterFlag: state.app.isRecruiterFlag
})


const mapDispatchToProps = dispatch => ({
  changeFormModel: data => dispatch(actions.merge(model, data)),
  resetFormValidity: () => dispatch(actions.resetValidity(model)),
  saveEvidence: (evidenceId, data) => dispatch(saveEvidence(evidenceId, data)),
  loadInitialData: evidenceId => dispatch(loadEvidenceData(evidenceId)),
  loadDomainData: domainId => dispatch(loadDomainData(domainId)),
  setError: message => dispatch(setErrorMessage(message))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerAssessmentFlowPage)
