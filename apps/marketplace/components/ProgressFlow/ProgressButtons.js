import React from 'react'
import PropTypes from 'prop-types'
import AUbutton from '@gov.au/buttons/lib/js/react.js'

const ProgressButtons = props => (
  <p>
    {props.isLastStage ? (
      <AUbutton
        type="submit"
        disabled={!props.publishEnabled}
        onClick={e => {
          e.preventDefault()
          props.onPublish()
        }}
      >
        {props.publishText}
      </AUbutton>
    ) : (
      <AUbutton type="submit">{props.continueText}</AUbutton>
    )}
    <AUbutton as="tertiary">{props.returnText}</AUbutton>
  </p>
)

ProgressButtons.defaultProps = {
  continueText: 'Save and continue',
  publishText: 'Publish',
  returnText: 'Return to overview',
  publishEnabled: false,
  onPublish: () => {}
}

ProgressButtons.propTypes = {
  continueText: PropTypes.string,
  publishText: PropTypes.string,
  returnText: PropTypes.string,
  isLastStage: PropTypes.bool.isRequired,
  publishEnabled: PropTypes.bool,
  onPublish: PropTypes.func
}

export default ProgressButtons
