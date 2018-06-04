import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import SellerNotifyButtons from './SellerNotifyButtons'

export class SellerNotifyIntroduction extends Component {
  constructor(props) {
    super(props)
    this.handleContinueClick = this.handleContinueClick.bind(this)
  }

  componentDidMount() {
    this.props.setStageStatus('introduction', 'doing')
    this.props.setStageDoneStatus('introduction', true)
  }

  handleContinueClick(e) {
    e.preventDefault()
    this.props.setStageStatus('introduction', 'done')
    this.props.setStageDoneStatus('introduction', true)
    this.props.moveToNextStage('introduction')
  }

  render() {
    if (this.props.flow === 'unsuccessful') {
      return (
        <div className="row">
          <div className="col-xs-12">
            <AUheading size="lg" level="2">
              Send debrief to sellers
            </AUheading>
            <p>
              As a requirement under Section 7.15 of the Commonweath Procurement Rules, you must advise sellers if they
              have been unsuccessful.
            </p>
            <p>
              Provie a debrief message to be sent via the Marketplace. Your{' '}
              <strong>name, number, and email will not be disclosed.</strong>
            </p>
            <p>
              <SellerNotifyButtons
                handleContinueClick={this.handleContinueClick}
                handleReturnToOverviewClick={this.props.handleReturnToOverviewClick}
              />
            </p>
          </div>
        </div>
      )
    }

    return <div />
  }
}

SellerNotifyIntroduction.propTypes = {
  flow: PropTypes.string.isRequired,
  setStageStatus: PropTypes.func.isRequired,
  moveToNextStage: PropTypes.func.isRequired,
  setStageDoneStatus: PropTypes.func.isRequired,
  handleReturnToOverviewClick: PropTypes.func.isRequired
}

export default SellerNotifyIntroduction
