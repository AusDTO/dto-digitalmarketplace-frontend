/**
 * LoadingIndicator.js
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styles from './LoadingIndicator.scss'
import classNames from 'classnames'

function LoadingIndicator(props) {

  const wrapper = classNames(
    props.isLoadingButton ? styles.buttonLoadingIndicator : '',
    styles.loadingIndicator
  )

  const inner = classNames(
    props.isLoadingButton ? styles.buttonLoadingInner : '',
    styles.loadingInner
  )

  return (
    <div className={wrapper}>
      <div className={inner}/>
    </div>
  )
}

export default LoadingIndicator
