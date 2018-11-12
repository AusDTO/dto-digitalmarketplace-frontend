import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import ProgressFlow from 'marketplace/components/ProgressFlow/ProgressFlow'
import BuyerRFQStages from 'marketplace/components/BuyerRFQ/BuyerRFQStages'
import BuyerRFQCompleted from 'marketplace/components/BuyerRFQ/BuyerRFQCompleted'
import { rootPath } from 'marketplace/routes'
import { loadPublicBrief, saveBrief } from 'marketplace/actions/briefActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { BuyerRFQFormReducer } from 'marketplace/reducers'

const model = 'BuyerRFQForm'

export class BuyerRFQFlowPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      flowIsDone: false
    }

    this.saveBrief = this.saveBrief.bind(this)
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
    this.props.loadInitialData(this.props.match.params.briefId).then(response => {
      // only accept data defined in the form reducer
      const data = { ...BuyerRFQFormReducer }
      if (response.data.brief) {
        Object.keys(response.data.brief).map(property => {
          if (Object.keys(BuyerRFQFormReducer).includes(property)) {
            data[property] = response.data.brief[property]
            return true
          }
          return true
        })
      }

      this.props.changeFormModel(data)

      this.setState({
        loading: false
      })
    })
  }

  saveBrief(publish = false) {
    const data = { ...this.props[model] }
    data.publish = publish
    this.props.saveBrief(this.props.match.params.briefId, data).then(response => {
      if (response.status === 200 && publish) {
        this.setState({
          flowIsDone: true
        })
      }
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
      return <BuyerRFQCompleted briefId={briefId} closingDate={this.props[model].closedAt} />
    }

    return (
      <ProgressFlow
        model={model}
        basename={`${rootPath}/buyer-rfq/${briefId}`}
        stages={BuyerRFQStages}
        saveModel={this.saveBrief}
        returnPath={`${rootPath}/brief/${briefId}/overview/rfq`}
        previewPath={`${rootPath}/digital-marketplace/opportunities/${briefId}`}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...formProps(state, model),
  csrfToken: state.app.csrfToken,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  changeFormModel: data => dispatch(actions.merge(model, data)),
  loadInitialData: briefId => dispatch(loadPublicBrief(briefId)),
  saveBrief: (briefId, data) => dispatch(saveBrief(briefId, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRFQFlowPage)
