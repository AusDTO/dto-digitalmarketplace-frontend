import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import formProps from 'shared/form/formPropsSelector'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import ProgressFlow from 'marketplace/components/ProgressFlow/ProgressFlow'
import SellerAssessmentStages from 'marketplace/components/SellerAssessment/SellerAssessmentStages'
import { rootPath } from 'marketplace/routes'
import { loadDomainData } from 'marketplace/actions/supplierActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { SellerAssessmentReducer } from 'marketplace/reducers'

const model = 'SellerAssessmentForm'

export class SellerAssessmentFlowPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      flowIsDone: false
    }
  }

  componentDidMount() {
    if (this.props.match.params.domainId) {
      this.getDomainData()
    }
  }

  getDomainData() {
    this.setState({
      loading: true
    })
    this.props.loadInitialData(this.props.match.params.domainId).then(response => {
      // only accept data defined in the form reducer
      const data = { ...SellerAssessmentReducer }
      if (response.data) {
        Object.keys(response.data).map(property => {
          if (Object.keys(SellerAssessmentReducer).includes(property)) {
            data[property] = response.data[property]
          }
          return true
        })

        this.props.changeFormModel(data)
      }
      this.setState({
        loading: false
      })
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
          title="A problem occurred when loading the assessment details"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    const domainId = this.props.match.params.domainId

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.state.flowIsDone) {
      return <Redirect to={`${rootPath}/seller-assessment/${domainId}/completed`} push />
    }

    return (
      <ProgressFlow
        model={model}
        meta={this.props.domain}
        basename={`${rootPath}/seller-assessment/${domainId}`}
        stages={SellerAssessmentStages}
        saveModel={() => Promise.resolve()}
        showReturnButton={false}
        showReviewButton={false}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...formProps(state, model),
  domain: state.domain.domain,
  csrfToken: state.app.csrfToken,
  errorMessage: state.app.errorMessage,
  emailAddress: state.app.emailAddress
})

const mapDispatchToProps = dispatch => ({
  changeFormModel: data => dispatch(actions.merge(model, data)),
  loadInitialData: domainId => dispatch(loadDomainData(domainId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerAssessmentFlowPage)
