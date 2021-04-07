import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { withRouter, Redirect } from 'react-router-dom'
import formProps from 'shared/form/formPropsSelector'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import ProgressFlow from 'marketplace/components/ProgressFlow/ProgressFlow'
import SellerEditStages from 'marketplace/components/SellerEdit/SellerEditStages'
import { rootPath } from 'marketplace/routes'
import { loadSellerEdit, saveSeller } from 'marketplace/actions/sellerEditActions'
import { setErrorMessage } from 'marketplace/actions/appActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { SellerEditFormReducer } from 'marketplace/reducers'

const model = 'SellerEditFlowPage'
const processResponse = response => {
  // only accept data defined in the form reducer
  const data = { ...SellerEditFormReducer }
  if (response.data) {
    Object.keys(response.data).map(property => {
      if (Object.keys(SellerEditFormReducer).includes(property)) {
        data[property] = response.data[property]
      }
      return true
    })
  }
  return data
}

export class SellerEditFlowPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      flowIsDone: false
    }

    this.handleStageMount = this.handleStageMount.bind(this)
    this.save = this.save.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.supplierCode) {
      this.getSellerData()
    }
  }

  getSellerData() {
    this.setState({
      loading: true
    })
    this.props.loadInitialData(this.props.match.params.supplierCode).then(response => {
      const data = processResponse(response)
      this.props.changeFormModel(data)
      this.setState({
        loading: false
      })
    })
  }

  save() {
    const data = { ...this.props[model] }
    this.setState({
      loading: true
    })
    return this.props.saveSeller(this.props.match.params.supplierCode, data.supplier).then(response => {
      if (response.status === 200) {
        this.props.changeFormModel(processResponse(response))
        this.setState({
          loading: false
        })
        return Promise.resolve(response)
      }
      this.setState({
        loading: false
      })
      return Promise.reject(response.data.message)
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
          title="A problem occurred when loading the opportunity details"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }
    const supplierCode = this.props.match.params.supplierCode

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.state.flowIsDone) {
      return <Redirect to={`${rootPath}/seller-edit/${supplierCode}/completed`} push />
    }

    return (
      <ProgressFlow
        model={model}
        basename={`${rootPath}/seller-edit/${supplierCode}`}
        stages={SellerEditStages}
        onStageMount={this.handleStageMount}
        saveModel={this.save}
        returnPath={`${rootPath}/seller-dashboard`}
        previewPath={`${rootPath}/digital-marketplace/opportunities/${supplierCode}`}
        showReturnButton={false}
        startText="Save &amp; continue"
      />
    )
  }
}

SellerEditFlowPage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  ...formProps(state, model),
  csrfToken: state.app.csrfToken,
  errorMessage: state.app.errorMessage,
  emailAddress: state.app.emailAddress
})

const mapDispatchToProps = dispatch => ({
  changeFormModel: data => dispatch(actions.merge(model, data)),
  loadInitialData: supplierCode => dispatch(loadSellerEdit(supplierCode)),
  saveSeller: (supplierCode, data) => dispatch(saveSeller(supplierCode, data)),
  resetFormValidity: () => dispatch(actions.resetValidity(model)),
  setError: message => dispatch(setErrorMessage(message))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SellerEditFlowPage)
)
