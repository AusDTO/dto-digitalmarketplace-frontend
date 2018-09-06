import React, { Component } from 'react'
import ProgressFlow from 'marketplace/components/ProgressFlow/ProgressFlow'
import BuyerRFQStages from 'marketplace/components/BuyerRFQ/BuyerRFQStages'
import BuyerRFQModel from 'marketplace/components/BuyerRFQ/BuyerRFQModel'
import { rootPath } from 'marketplace/routes'

export class BuyerRFQPage extends Component {
  constructor(props) {
    super(props)
    this.state = BuyerRFQModel

    this.updateModel = this.updateModel.bind(this)
  }

  updateModel(model) {
    this.setState({ ...model })
  }

  render() {
    return (
      <ProgressFlow
        model={this.state}
        updateModel={this.updateModel}
        basename={`${rootPath}/buyer-rfq`}
        flowStages={BuyerRFQStages}
      />
    )
  }
}

export default BuyerRFQPage
