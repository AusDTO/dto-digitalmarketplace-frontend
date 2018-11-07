import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import ProgressFlow from 'marketplace/components/ProgressFlow/ProgressFlow'
import BuyerRFQStages from 'marketplace/components/BuyerRFQ/BuyerRFQStages'
import BuyerRFQCompleted from 'marketplace/components/BuyerRFQ/BuyerRFQCompleted'
import { rootPath } from 'marketplace/routes'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import dmapi from '../services/apiClient'

const model = 'BuyerRFQForm'

export class BuyerRFQFlowPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      errorMessage: '',
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
    dmapi({
      url: `/brief/${this.props.match.params.briefId}`
    }).then(response => {
      if (!response || response.error || !response.data || !response.data.brief.id) {
        this.setState({
          errorMessage: response.errorMessage,
          loading: false
        })
        return
      }
      const data = {}
      data.id = response.data.brief.id || 0
      data.title = response.data.brief.title || ''
      data.organisation = response.data.brief.organisation || ''
      data.location = response.data.brief.location || []
      data.summary = response.data.brief.summary || ''
      data.industryBriefing = response.data.brief.industryBriefing || ''
      data.sellers = response.data.brief.sellers || {}
      data.attachments = response.data.brief.attachments || []
      data.requirementsDocument = response.data.brief.requirementsDocument || []
      data.responseTemplate = response.data.brief.responseTemplate || []
      data.evaluationType = response.data.brief.evaluationType || []
      data.proposalType = response.data.brief.proposalType || []
      data.evaluationCriteria = response.data.brief.evaluationCriteria || [{ criteria: '', weighting: '' }]
      data.includeWeightings = response.data.brief.includeWeightings || false
      data.closedAt = response.data.brief.closedAt || ''
      data.startDate = response.data.brief.startDate || ''
      data.contractLength = response.data.brief.contractLength || ''
      data.budgetRange = response.data.brief.budgetRange || ''
      data.workingArrangements = response.data.brief.workingArrangements || ''

      this.props.changeFormModel(data)

      this.setState({
        errorMessage: '',
        loading: false
      })
    })
  }

  saveBrief(publish = false) {
    const data = { ...this.props[model] }
    if (publish) {
      data.publish = true
    }
    dmapi({
      url: `/brief/${this.props.match.params.briefId}`,
      method: 'PATCH',
      headers: {
        'X-CSRFToken': this.props.csrfToken,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    }).then(response => {
      if (!response || response.error || !response.data || !response.data.id) {
        this.setState({
          errorMessage: response.errorMessage
        })
        return
      }
      if (publish) {
        this.setState({
          flowIsDone: true
        })
      }
    })
  }

  render() {
    if (this.state.errorMessage) {
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
          errorMessage={this.state.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.state.flowIsDone) {
      return <BuyerRFQCompleted briefId={this.props.match.params.briefId} closingDate={this.props[model].closedAt} />
    }

    return (
      <ProgressFlow
        model={model}
        basename={`${rootPath}/buyer-rfq/${this.props.match.params.briefId}`}
        stages={BuyerRFQStages}
        saveModel={this.saveBrief}
        returnPath={`${rootPath}/brief/${this.props.match.params.briefId}/overview/rfq`}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...formProps(state, model),
  csrfToken: state.app.csrfToken
})

const mapDispatchToProps = dispatch => ({
  changeFormModel: data => dispatch(actions.merge(model, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRFQFlowPage)
