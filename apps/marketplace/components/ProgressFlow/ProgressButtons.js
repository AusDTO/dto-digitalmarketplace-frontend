import React from 'react'
import PropTypes from 'prop-types'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input'
import styles from './ProgressButtons.scss'

const ProgressButtons = props => (
  <div className={styles.container}>
    {props.showConfirmationCheckbox &&
      props.isLastStage &&
      !props.isFirstStage &&
      props.hasPermissionToPublish && (
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
      {props.isLastStage &&
        !props.isFirstStage && (
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
            {props.hasPermissionToPublish && (
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
  confirmationText: 'I understand that this opportunity will be published on the Digital Marketplace',
  continueText: 'Save and continue',
  onPublish: () => {},
  onPreview: () => {},
  onReturn: () => {},
  onConfirmationClick: () => {},
  previewText: 'Review',
  publishEnabled: false,
  publishText: 'Publish',
  returnText: 'Return to overview',
  showReturnButton: true,
  showReviewButton: true,
  showConfirmationCheckbox: true,
  startText: 'Start now',
  hasPermissionToPublish: true
}

ProgressButtons.propTypes = {
  confirmationText: PropTypes.string,
  continueText: PropTypes.string,
  publishText: PropTypes.string,
  returnText: PropTypes.string,
  isLastStage: PropTypes.bool.isRequired,
  isFirstStage: PropTypes.bool.isRequired,
  onConfirmationClick: PropTypes.func,
  onPublish: PropTypes.func,
  onReturn: PropTypes.func,
  publishEnabled: PropTypes.bool,
  showConfirmationCheckbox: PropTypes.bool,
  showReviewButton: PropTypes.bool,
  startText: PropTypes.string,
  hasPermissionToPublish: PropTypes.bool,
  showReturnButton: PropTypes.bool
}

export default ProgressButtons
