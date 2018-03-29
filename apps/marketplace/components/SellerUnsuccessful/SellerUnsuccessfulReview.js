import React, { Component } from 'react'
import Button from '@gov.au/buttons/lib/js/react.js'

export class SellerUnsuccessfulIntroduction extends Component {
  constructor(props) {
    super(props)
    this.handleContinueClick = this.handleContinueClick.bind(this)
  }

  componentDidMount() {
    this.props.setStageStatus('review', 'doing')
  }

  handleContinueClick(e) {
    e.preventDefault()
    this.props.setStageStatus('review', 'done')
    this.props.moveToNextStage('review')
  }

  render() {
    if (!this.props.hasSelectedSeller()) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <h2>Review email</h2>
            <p>You must first select at least one seller.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>Review email</h2>
          <p>
            <strong>This email will be sent seperately to:</strong>
          </p>
          <ul>
            {this.props.selectedSellers.map(seller =>
              <li key={seller.id}>{seller.name}</li>
            )}
          </ul>
          <p>
            <Button onClick={this.handleContinueClick} text="Send email" />
          </p>
        </div>
      </div>
    )
  }
}

export default SellerUnsuccessfulIntroduction
