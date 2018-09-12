import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { rootPath } from 'marketplace/routes'
import BuyerRFQStages from 'marketplace/components/BuyerRFQ/BuyerRFQStages'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import dmapi from '../services/apiClient'

export class BuyerRFQCreatePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      briefId: 0
    }
  }

  componentDidMount() {
    dmapi({
      url: '/brief/rfq',
      method: 'POST'
    }).then(response => {
      if (!response || response.error || !response.data || !response.data.id) {
        return
      }
      this.setState({
        briefId: parseInt(response.data.id, 10)
      })
    })
  }

  render() {
    if (this.state.briefId) {
      return <Redirect to={`${rootPath}/buyer-rfq/${this.state.briefId}/${BuyerRFQStages[0].slug}`} />
    }

    return <LoadingIndicatorFullPage />
  }
}

export default BuyerRFQCreatePage
