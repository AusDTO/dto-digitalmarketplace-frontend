import React from 'react'
import PropTypes from 'prop-types'
import AUbutton from '@gov.au/buttons/lib/js/react.js'

const ProgressButtons = props => (
  <p>
    {props.isFirstStage && !props.isLastStage && <AUbutton type="submit">{props.startText}</AUbutton>}
    {props.isLastStage &&
      !props.isFirstStage && (
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
      )}
    {!props.isFirstStage && !props.isLastStage && <AUbutton type="submit">{props.continueText}</AUbutton>}
    <AUbutton
      as="tertiary"
      onClick={e => {
        e.preventDefault()
        props.onReturn()
      }}
    >
      {props.returnText}
    </AUbutton>
  </p>
)

ProgressButtons.defaultProps = {
  startText: 'Start now',
  continueText: 'Save and continue',
  publishText: 'Publish',
  returnText: 'Return to overview',
  publishEnabled: false,
  onPublish: () => {},
  onReturn: () => {}
}

ProgressButtons.propTypes = {
  startText: PropTypes.string,
  continueText: PropTypes.string,
  publishText: PropTypes.string,
  returnText: PropTypes.string,
  isLastStage: PropTypes.bool.isRequired,
  isFirstStage: PropTypes.bool.isRequired,
  publishEnabled: PropTypes.bool,
  onPublish: PropTypes.func,
  onReturn: PropTypes.func
}

export default ProgressButtons
