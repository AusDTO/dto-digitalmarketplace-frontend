/**
 * LoadingButton.js
 *
 * Wraps the loading indicator in a tag with the .btn--loading class
 */

import React from 'react'
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator'
import styles from './LoadingButton.scss'
import PropTypes from 'prop-types'

function LoadingButton(props) {
  return (
    <div className={`${props.className} au-btn ${styles.loadingButton}`} disabled="true">
      {props.text}
      <LoadingIndicator isLoadingButton />
    </div>
  )
}

LoadingButton.defaultProps = {
  text: 'Loading'
}

LoadingButton.propTypes = {
  text: PropTypes.string
}

export default LoadingButton
