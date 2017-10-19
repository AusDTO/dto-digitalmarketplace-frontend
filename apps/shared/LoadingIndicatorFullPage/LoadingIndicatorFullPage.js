/**
 * LoadingIndicator.js
 *
 */

import React from 'react'
import styles from './LoadingIndicatorFullPage.scss'

function LoadingIndicatorFullPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loadingIndicator}>
        <div className={styles.loadingInner} />
      </div>
      <div className={styles.loadingText}>Filtering results...</div>
    </div>
  )
}

export default LoadingIndicatorFullPage
