import React from 'react'
import PropTypes from 'prop-types'
import AUbutton from '@gov.au/buttons/lib/js/react.js'

const SellerNotifyButtons = props =>
  <span>
    <AUbutton onClick={props.handleContinueClick} disabled={props.disabled}>
      {props.continueText}
    </AUbutton>
    <AUbutton onClick={props.handleReturnToOverviewClick} as="tertiary">
      Return to overview
    </AUbutton>
  </span>

SellerNotifyButtons.defaultProps = {
  disabled: false,
  continueText: 'Continue'
}

SellerNotifyButtons.propTypes = {
  handleContinueClick: PropTypes.func.isRequired,
  handleReturnToOverviewClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  continueText: PropTypes.string
}

export default SellerNotifyButtons
