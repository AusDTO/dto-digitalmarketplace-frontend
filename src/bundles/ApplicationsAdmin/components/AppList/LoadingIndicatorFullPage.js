/**
 * LoadingIndicator.js
 *
 */

import React from 'react'
import './LoadingIndicatorFullPage.css'
function LoadingIndicatorFullPage() {
  return (
    <div styleName="wrapper">
    <div styleName="loadingIndicator">
      <div styleName="loadingInner" />
    </div>
    <div styleName="loadingText">Loading...</div>
    </div>
  )
}

export default LoadingIndicatorFullPage
