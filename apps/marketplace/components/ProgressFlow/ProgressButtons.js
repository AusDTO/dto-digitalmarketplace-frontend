import React from 'react'
import PropTypes from 'prop-types'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input'
import styles from './ProgressButtons.scss'

const ProgressButtons = props => (
  <div className={styles.container}>
    {props.showConfirmationCheckbox && props.isLastStage && !props.isFirstStage && (
      <p>
        <span>
          <AUcheckbox
            id="cb-declaration"
            onClick={e => {
              props.onConfirmationClick(e.target.checked)
            }}
            label={props.confirmationText}
          />
        </span>
      </p>
    )}
    <p>
      {props.isFirstStage && !props.isLastStage && <AUbutton type="submit">{props.startText}</AUbutton>}
      {props.isLastStage && !props.isFirstStage && (
        <span>
          {props.showReviewButton && (
            <AUbutton
              onClick={e => {
                e.preventDefault()
                props.onPreview()
              }}
              as="secondary"
              className={styles.button}
            >
              {props.previewText}
            </AUbutton>
          )}
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
        </span>
      )}
      {!props.isFirstStage && !props.isLastStage && <AUbutton type="submit">{props.continueText}</AUbutton>}
      {props.showReturnButton && (
        <AUbutton
          as="tertiary"
          onClick={e => {
            e.preventDefault()
            props.onReturn()
          }}
        >
          {props.returnText}
        </AUbutton>
      )}
    </p>
  </div>
)

ProgressButtons.defaultProps = {
  startText: 'Start now',
  continueText: 'Save and continue',
  previewText: 'Review',
  publishText: 'Publish',
  returnText: 'Return to overview',
  publishEnabled: false,
  onPublish: () => {},
  onPreview: () => {},
  onReturn: () => {},
  onConfirmationClick: () => {},
  showReturnButton: true,
  showReviewButton: true,
  showConfirmationCheckbox: true
}

ProgressButtons.propTypes = {
  startText: PropTypes.string,
  continueText: PropTypes.string,
  publishText: PropTypes.string,
  returnText: PropTypes.string,
  confirmationText: PropTypes.string.isRequired,
  isLastStage: PropTypes.bool.isRequired,
  isFirstStage: PropTypes.bool.isRequired,
  publishEnabled: PropTypes.bool,
  onPublish: PropTypes.func,
  onReturn: PropTypes.func,
  onConfirmationClick: PropTypes.func,
  showReturnButton: PropTypes.bool,
  showReviewButton: PropTypes.bool,
  showConfirmationCheckbox: PropTypes.bool
}

export default ProgressButtons
