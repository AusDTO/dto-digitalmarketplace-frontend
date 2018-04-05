import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@gov.au/buttons/lib/js/react.js'

export class SellerNotifyIntroduction extends Component {
  constructor(props) {
    super(props)
    this.handleContinueClick = this.handleContinueClick.bind(this)
  }

  componentDidMount() {
    this.props.setStageStatus('introduction', 'doing')
  }

  handleContinueClick(e) {
    e.preventDefault()
    this.props.setStageStatus('introduction', 'done')
    this.props.moveToNextStage('introduction')
  }

  render() {
    if (this.props.flow === 'unsuccessful') {
      return (
        <div className="row">
          <div className="col-xs-12">
            <h2>What you are requesting</h2>
            <p>Bla bla bla bla</p>
            <ul>
              <li>bla bla</li>
              <li>bla</li>
            </ul>
            <p>
              <Button onClick={this.handleContinueClick} text="Continue" />
            </p>
          </div>
        </div>
      )
    }

    return <div />
  }
}

SellerNotifyIntroduction.propTypes = {
  flow: PropTypes.string.isRequired
}

export default SellerNotifyIntroduction
