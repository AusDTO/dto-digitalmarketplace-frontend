import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import formProps from 'shared/form/formPropsSelector'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import ProgressFlow from 'marketplace/components/ProgressFlow/ProgressFlow'
import SellerEditStages from 'marketplace/components/SellerEdit/SellerEditStages'
import { rootPath } from 'marketplace/routes'
import { loadPublicBrief, saveBrief } from 'marketplace/actions/briefActions'
import { setErrorMessage } from 'marketplace/actions/appActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { BuyerSpecialistFormReducer } from 'marketplace/reducers'

const model = 'SellerEditFlowPage'

export class SellerEditFlowPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      flowIsDone: false
    }

    this.saveBrief = this.saveBrief.bind(this)
    this.handleStageMount = this.handleStageMount.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.briefId) {
      this.getBriefData()
    }
  }

  getBriefData() {
    this.setState({
      loading: true
    })
    // this.props.loadInitialData(this.props.match.params.briefId).then(response => {
    //   // only accept data defined in the form reducer
    //   const data = { ...BuyerSpecialistFormReducer }
    //   if (response.data.brief) {
    //     Object.keys(response.data.brief).map(property => {
    //       if (Object.keys(BuyerSpecialistFormReducer).includes(property)) {
    //         data[property] = response.data.brief[property]
    //       }
    //       return true
    //     })

    //     if (response.data.brief.status && response.data.brief.status !== 'draft') {
    //       this.props.setError('You cannot edit this opportunity as you have already published it.')
    //     }

    //     if (response.data.brief.lotSlug !== 'specialist') {
    //       this.props.setError('You can only edit specialist briefs using this flow.')
    //     }

    //     this.props.changeFormModel(data)
    //   }

    //   this.setState({
    //     loading: false
    //   })
    // })
  }

  saveBrief(publish = false) {
    if (publish) {
      this.setState({
        loading: true
      })
    }
    const data = { ...this.props[model] }
    data.publish = publish
    return this.props.saveBrief(this.props.match.params.briefId, data).then(response => {
      if (response.status === 200 && publish) {
        this.setState({
          flowIsDone: true,
          loading: false
        })
      }
    })
  }

  handleStageMount() {
    // this.props.resetFormValidity()
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
          title="A problem occurred when loading the brief details"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    const briefId = this.props.match.params.briefId

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.state.flowIsDone) {
      return <Redirect to={`${rootPath}/seller-edit/${briefId}/completed`} push />
    }

    return (
      <ProgressFlow
        model={model}
        basename={`${rootPath}/seller-edit/${briefId}`}
        stages={SellerEditStages}
        onStageMount={this.handleStageMount}
        saveModel={this.saveBrief}
        returnPath={`${rootPath}/brief/${briefId}/overview/specialist`}
        previewPath={`${rootPath}/digital-marketplace/opportunities/${briefId}`}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...formProps(state, model),
  csrfToken: state.app.csrfToken,
  errorMessage: state.app.errorMessage,
  emailAddress: state.app.emailAddress
})

const mapDispatchToProps = dispatch => ({
  changeFormModel: data => dispatch(actions.merge(model, data)),
  loadInitialData: briefId => dispatch(loadPublicBrief(briefId)),
  saveBrief: (briefId, data) => dispatch(saveBrief(briefId, data)),
  resetFormValidity: () => dispatch(actions.resetValidity(model)),
  setError: message => dispatch(setErrorMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerEditFlowPage)
