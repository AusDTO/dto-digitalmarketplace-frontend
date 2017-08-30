/**
 * LoadingButton.js
 *
 * Wraps the loading indicator in a tag with the .btn--loading class
 */

import React from 'react'
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator'

function LoadingButton(props) {
  return (
    <div className={props.className + ' uikit-btn loading-indicator'} disabled="true">
      Loading
      <LoadingIndicator />
    </div>
  )
}

export default LoadingButton
