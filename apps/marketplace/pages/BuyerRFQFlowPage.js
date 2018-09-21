import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import ProgressFlow from 'marketplace/components/ProgressFlow/ProgressFlow'
import BuyerRFQStages from 'marketplace/components/BuyerRFQ/BuyerRFQStages'
import { rootPath } from 'marketplace/routes'
import dmapi from '../services/apiClient'

const model = 'BuyerRFQForm'

export class BuyerRFQFlowPage extends Component {
  constructor(props) {
    super(props)
    this.saveBrief = this.saveBrief.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.briefId) {
      this.getBriefData()
    }
  }

  getBriefData() {
    dmapi({
      url: `/brief/${this.props.match.params.briefId}`
    }).then(response => {
      if (!response || response.error || !response.data || !response.data.id) {
        return
      }
      const data = {}
      data.id = response.data.id || 0
      data.title = response.data.title || ''
      data.organisation = response.data.organisation || ''
      data.summary = response.data.summary || ''
      data.sellers = response.data.sellers || {}
      data.attachedDocumentURL = response.data.attachedDocumentURL || []
      data.closedAt = response.data.closedAt || ''
      this.props.changeFormModel(data)
    })
  }

  saveBrief() {
    dmapi({
      url: `/brief/${this.props.match.params.briefId}`,
      method: 'PATCH',
      data: JSON.stringify(this.props[model])
    })
  }

  render() {
    return (
      <ProgressFlow
        model={model}
        basename={`${rootPath}/buyer-rfq/${this.props.match.params.briefId}`}
        flowStages={BuyerRFQStages}
        saveBrief={this.saveBrief}
      />
    )
  }
}

const mapStateToProps = state => ({
  ...formProps(state, model)
})

const mapDispatchToProps = dispatch => ({
  changeFormModel: data => dispatch(actions.merge(model, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRFQFlowPage)
