/**
 * LoadingIndicator.js
 *
 */

import React from 'react'
import classNames from 'classnames'
import styles from './LoadingIndicator.scss'

function LoadingIndicator(props) {
  const wrapper = classNames(props.isLoadingButton ? styles.buttonLoadingIndicator : '', styles.loadingIndicator)

  const inner = classNames(props.isLoadingButton ? styles.buttonLoadingInner : '', styles.loadingInner)

  return (
    <div className={wrapper}>
      <div className={inner} />
    </div>
  )
}

export default LoadingIndicator
