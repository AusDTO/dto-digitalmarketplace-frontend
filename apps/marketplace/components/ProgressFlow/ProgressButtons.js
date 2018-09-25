import React from 'react'
import PropTypes from 'prop-types'
import AUbutton from '@gov.au/buttons/lib/js/react.js'

const ProgressButtons = props => (
  <p>
    {props.isLastStage ? (
      <AUbutton type="submit" disabled={!props.submitEnabled}>
        {props.publishText}
      </AUbutton>
    ) : (
      <AUbutton type="submit">{props.continueText}</AUbutton>
    )}
    <AUbutton as="tertiary">{props.returnText}</AUbutton>
  </p>
)

ProgressButtons.defaultProps = {
  continueText: 'Continue',
  publishText: 'Publish',
  returnText: 'Return to overview',
  submitEnabled: false
}

ProgressButtons.propTypes = {
  continueText: PropTypes.string,
  publishText: PropTypes.string,
  returnText: PropTypes.string,
  isLastStage: PropTypes.bool.isRequired,
  submitEnabled: PropTypes.bool
}

export default ProgressButtons
