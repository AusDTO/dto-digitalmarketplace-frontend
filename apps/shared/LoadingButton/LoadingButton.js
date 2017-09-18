/**
 * LoadingButton.js
 *
 * Wraps the loading indicator in a tag with the .btn--loading class
 */

import React from 'react'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import styles from './LoadingButton.scss'

function LoadingButton(props) {
  return (
    <div className={`${props.className} uikit-btn ${styles.loadingButton}`} disabled="true">
      Loading
      <LoadingIndicator isLoadingButton />
    </div>
  )
}

export default LoadingButton
