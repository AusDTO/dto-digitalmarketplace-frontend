/**
 * LoadingButton.js
 *
 * Wraps the loading indicator in a tag with the .btn--loading class
 */

import React from 'react'
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator'

function LoadingButton(props) {
  return(
    <a href="#" className={props.className + " uikit-btn"} disabled="true">
      <LoadingIndicator />
    </a>
  )
}

export default LoadingButton
