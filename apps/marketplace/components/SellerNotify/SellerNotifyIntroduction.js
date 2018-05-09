import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

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
              This is the introduction stage
            </AUheading>
            <p>Here, we describe which notification a buyer is about to send out.</p>
            <p>
              <AUbutton onClick={this.handleContinueClick}>Continue</AUbutton>
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
  setStageDoneStatus: PropTypes.func.isRequired
}

export default SellerNotifyIntroduction
